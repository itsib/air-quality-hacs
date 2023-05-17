# Air Quality

Интеграция для [Home Assistant](https://home-assistant.io/), позволяет другим интеграциям обрабатывать данные о 
состоянии окружающей среды и загрязнении воздуха. А так же есть возможность отображать эти данные в графическом 
интерфейсе [Lovelace](https://www.home-assistant.io/dashboards/).

### Интерфейс

![Interface Screenshot](/resources/air-quality-preview.png)
![Interface Screenshot 2](/resources/air-quality-preview-0.png)


Интеграция поставляет данные:
* **AQI** - Индекс качества воздуха.
* **PM<sub>2.5</sub>** - концентрация PM<sub>2.5</sub> в мкг/м3.
* **PM<sub>10</sub>** - концентрация PM<sub>10</sub> в мкг/м3.
* **Температура** - Температура окружающей среды, в градусах цельсия.
* **Влажность** - Влажность в процентах.
* **Давление** - Атмосферное давление, в миллиметрах ртутного столба.

### О проекте
Система мониторинга воздуха г. Красноярска (далее – ОБЪЕДИНЕННАЯ СИСТЕМА МОНИТОРИНГА) – это проект, в котором интегрированы данные основных существующих в г. Красноярске систем наблюдений и мониторинга загрязнения атмосферного воздуха:

* «Краевая ведомственная информационно-аналитическая система данных о состоянии окружающей среды Красноярского края» эксплуатацию и поддержку которой осуществляет Министерство экологии и рационального природопользования Красноярского края через краевое государственное бюджетное учреждение «Центр реализации мероприятий по природопользованию и охране окружающей среды».
* «Система мониторинга воздуха Красноярского научного центра СО РАН» эксплуатацию и поддержку которой осуществляет Институт вычислительного моделирования СО РАН.
* «Система мониторинга «Эковизор» эксплуатацию и поддержку которой осуществляет региональное отделение «Российской Экологической Партии «Зеленые» в Красноярском крае.
* «Сигнальная сеть загрязнения воздуха «Nebo» эксплуатацию и поддержку которой осуществляет Общественный экологический проект «Nebo».

API предоставлено сервисом [https://air.krasn.ru/](https://air.krasn.ru/).

------
## Installation

### Manual
Download this repository and place the contents of `custom_components` in your own `custom_components` map of your Home Assistant installation. Restart Home Assistant and add the integration through your settings. 

### HACS

Integration -> Context menu -> Custom repositories. 

Paste url `https://github.com/itsib/air-quality-hacs` and choose `integration` in category selector.

Search for "Air Quality" when adding HACS integrations and add "Air Quality Sensors KRSK". Restart Home Assistant and add the integration through your settings. 

