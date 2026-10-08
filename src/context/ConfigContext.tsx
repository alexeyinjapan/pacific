import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_CONFIG = {
  company_name: "Pacific Partners Tokyo Co., Ltd.",
  header_logo_text: "Pacific Partners Tokyo",
  contact_phone: "+81 (0) 50-6871-2292",
  contact_email: "info@ppt-japan.com",
  contact_address: "Level 9, Ariake Frontier Building Tower B, 3-7-26 Ariake, Koto-ku, Tokyo, 135-0063, Japan",
  whatsapp_link: "https://api.whatsapp.com/send/?phone=819099661555",
  telegram_link: "https://t.me/olga_japan",

  // Лиды
  telegram_bot_token: "",
  telegram_chat_id: "5435183297",
  web3forms_key: "6583fb27-f160-4a7d-bc88-f886547bbe9c",

  // Аналитика и Вебмастер (ПО УМОЛЧАНИЮ ПУСТО)
  yandex_metrika_id: "",
  google_analytics_id: "",
  yandex_verification_code: "",

  // Валюты и курсы
  currency_primary_symbol: "$",
  currency_secondary_symbol: "¥",
  rate_to_primary: 1,
  rate_to_secondary: 155,

  // Цены туров
  price_spring_standard: 2350,
  price_spring_superior: 2690,
  price_spring_single: 2980,
  price_summer_standard: 1980,
  price_summer_superior: 2280,
  price_summer_single: 2540,
  price_autumn_standard: 2250,
  price_autumn_superior: 2590,
  price_autumn_single: 2880,
  price_winter_standard: 1890,
  price_winter_superior: 2170,
  price_winter_single: 2420,

  // Допы
  addon_tea_name: "Традиционная чайная церемония в Киото",
  addon_tea_price: 65,
  addon_universal_name: "Билет в Universal Studios Japan (Осака)",
  addon_universal_price: 85,
  addon_kimono_name: "Фотосессия в шёлковом кимоно в Киото",
  addon_kimono_price: 140,

  // Сезоны
  season_spring_title: "Весна",
  season_spring_sub: "Сакура",
  season_summer_title: "Лето",
  season_summer_sub: "Фестивали",
  season_autumn_title: "Осень",
  season_autumn_sub: "Клёны",
  season_winter_title: "Зима",
  season_winter_sub: "Фуджи & онсэн",

  // Номера
  room_standard_name: "Standard Twin/Double",
  room_superior_name: "Superior Room",
  room_single_name: "Single (1 человек)",
};

const MASTER_SHEET_ID = "10MGliwSNVyvg_rB6exAle4I8x9B0j5K9qq5dJPpI_3k";

// Функции динамического внедрения счетчиков и мета-тегов
const injectAnalyticsAndVerification = (ymId?: string | number, gaId?: string, yandexVerify?: string) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // 1. Мета-тег Яндекс Вебмастера (только если указан код)
  if (yandexVerify && String(yandexVerify).trim() !== '') {
    let meta = document.querySelector('meta[name="yandex-verification"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'yandex-verification');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', String(yandexVerify).trim());
  }

  // 2. Яндекс Метрика (только если указан ID)
  if (ymId && String(ymId).trim() !== '' && !document.getElementById('ym-dynamic-script')) {
    const ymScript = document.createElement('script');
    ymScript.id = 'ym-dynamic-script';
    ymScript.type = 'text/javascript';
    ymScript.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(${ymId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
    `;
    document.head.appendChild(ymScript);
  }

  // 3. Google Analytics 4 (только если указан ID)
  if (gaId && String(gaId).trim() !== '' && !document.getElementById('ga-dynamic-script')) {
    const gaTag = document.createElement('script');
    gaTag.id = 'ga-dynamic-script';
    gaTag.async = true;
    gaTag.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaTag);

    const gaInit = document.createElement('script');
    gaInit.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(gaInit);
  }
};

const ConfigContext = createContext(DEFAULT_CONFIG);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    try {
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const sheetId = params?.get('partner') || (typeof window !== 'undefined' && (window as any).PARTNER_SHEET_ID) || MASTER_SHEET_ID;

      if (!sheetId) return;

      fetch(`https://opensheet.elk.sh/${sheetId}/settings`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data: any[]) => {
          if (!Array.isArray(data)) return;
          const loaded: any = {};
          const numericFields = [
            'rate_to_primary', 'rate_to_secondary',
            'addon_tea_price', 'addon_universal_price', 'addon_kimono_price',
            'price_spring_standard', 'price_spring_superior', 'price_spring_single',
            'price_summer_standard', 'price_summer_superior', 'price_summer_single',
            'price_autumn_standard', 'price_autumn_superior', 'price_autumn_single',
            'price_winter_standard', 'price_winter_superior', 'price_winter_single',
          ];

          data.forEach(item => {
            if (item && item.parameter && item.value !== undefined && item.value !== '') {
              if (numericFields.includes(item.parameter)) {
                const num = Number(item.value);
                if (!isNaN(num)) loaded[item.parameter] = num;
              } else {
                loaded[item.parameter] = item.value;
              }
            }
          });

          // Заголовок вкладки
          const activeCompany = loaded.company_name || loaded.header_logo_text || DEFAULT_CONFIG.company_name;
          if (typeof document !== 'undefined') {
            document.title = `Япония: между традицией и будущим | ${activeCompany}`;
          }

          // Подключаем Метрику, Google Analytics и Мета-тег Яндекс Вебмастера
          injectAnalyticsAndVerification(
            loaded.yandex_metrika_id,
            loaded.google_analytics_id,
            loaded.yandex_verification_code
          );

          setConfig(prev => ({ ...prev, ...loaded }));
        })
        .catch((err) => console.log("Работаем на базовых настройках:", err?.message || err));
    } catch (e) {
      console.log("Config initialization fallback:", e);
    }
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);