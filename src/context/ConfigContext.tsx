import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_CONFIG = {
  // 1. Компания и контакты (ЕДИНОЕ НАЗВАНИЕ)
  company_name: "Pacific Partners Tokyo Co., Ltd.",
  header_logo_text: "Pacific Partners Tokyo",
  contact_phone: "+81 (0) 50-6871-2292",
  contact_email: "info@ppt-japan.com",
  contact_address: "Level 9, Ariake Frontier Building Tower B, 3-7-26 Ariake, Koto-ku, Tokyo, 135-0063, Japan",
  whatsapp_link: "https://api.whatsapp.com/send/?phone=819099661555",
  telegram_link: "https://t.me/olga_japan",

  // 2. Лиды (секретный токен берется из Google Таблицы)
  telegram_bot_token: "",
  telegram_chat_id: "5435183297",
  web3forms_key: "6583fb27-f160-4a7d-bc88-f886547bbe9c",

  // 3. Валюты и курсы
  currency_primary_symbol: "$",
  currency_secondary_symbol: "¥",
  rate_to_primary: 1,
  rate_to_secondary: 155,

  // 4. Сетка цен (12 точных цен)
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

  // 5. Допы
  addon_tea_name: "Традиционная чайная церемония в Киото",
  addon_tea_price: 65,
  addon_universal_name: "Билет в Universal Studios Japan (Осака)",
  addon_universal_price: 85,
  addon_kimono_name: "Фотосессия в шёлковом кимоно в Киото",
  addon_kimono_price: 140,

  // 6. Сезоны
  season_spring_title: "Весна",
  season_spring_sub: "Сакура",
  season_summer_title: "Лето",
  season_summer_sub: "Фестивали",
  season_autumn_title: "Осень",
  season_autumn_sub: "Клёны",
  season_winter_title: "Зима",
  season_winter_sub: "Фуджи & онсэн",

  // 7. Номера
  room_standard_name: "Standard Twin/Double",
  room_superior_name: "Superior Room",
  room_single_name: "Single (1 человек)",
};

const MASTER_SHEET_ID = "10MGliwSNVyvg_rB6exAle4I8x9B0j5K9qq5dJPpI_3k";

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

          // АВТОМАТИЧЕСКИ МЕНЯЕМ ЗАГОЛОВОК ВКЛАДКИ БРАУЗЕРА ПОД АГЕНТА:
          const activeCompany = loaded.company_name || loaded.header_logo_text || DEFAULT_CONFIG.company_name;
          if (typeof document !== 'undefined') {
            document.title = `Япония: между традицией и будущим | ${activeCompany}`;
          }

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