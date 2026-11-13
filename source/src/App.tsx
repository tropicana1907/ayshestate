import { FormEvent, useEffect, useState } from "react";

const directions = [
  {
    number: "01",
    title: "Управление продажами",
    text: "Диагностика текущей модели, логика воронки, стандарты работы и управленческий ритм.",
    result: "Продажи становятся системой, которой можно управлять.",
  },
  {
    number: "02",
    title: "Цифровая витрина и сайт",
    text: "Структура, сценарии, аргументация и подача проекта с точки зрения реального пути покупателя.",
    result: "Сайт помогает понять ценность продукта и продолжить диалог.",
  },
  {
    number: "03",
    title: "Работа с обращениями",
    text: "Путь обращения от первого контакта до встречи: скорость, качество ответа и следующий шаг.",
    result: "Ни один сильный запрос не теряется между каналами и сотрудниками.",
  },
  {
    number: "04",
    title: "Команда и знание продукта",
    text: "Погружение команды в продукт, единая логика презентации и работа со сложными вопросами.",
    result: "Менеджеры продают не набор характеристик, а ценность проекта.",
  },
  {
    number: "05",
    title: "CRM и шахматка",
    text: "Проверка логики инструментов, статусов, данных и управленческой отчётности.",
    result: "У руководителя появляется достоверная картина продаж.",
  },
  {
    number: "06",
    title: "Презентация и история проекта",
    text: "Смысловая архитектура материалов: от идеи и места до продукта и аргументов выбора.",
    result: "Проект звучит цельно во всех точках контакта.",
  },
];

const projects = [
  { name: "Лаврушинский", image: "https://www.theartnewspaper.ru/media/images/21545_Fasady_7_copy.width-1290.jpg", source: "https://www.theartnewspaper.ru/posts/20240904-ybxl/" },
  { name: "Ильинка 3/8", image: "https://premium.estate/media/15823/conversions/1d87aa76228afe349ba11424bb6238f8-webp.webp", source: "https://premium.estate/novosti-developerov/sminex-inteko-uvelichit-svoy-obem-stroitelstva-v-moskve-v-dva-raza" },
  { name: "Обыденский № 1", image: "https://avatars.mds.yandex.net/get-verba/1672712/2a00000193244bfae1498d7c92bcafcfb0b4/realty_large", source: "https://realty.yandex.ru/moskva_i_moskovskaya_oblast/kupit/novostrojka/obydenskij-1-3420941/" },
  { name: "Чистые Пруды", image: "https://anwin.ru/upload/iblock/d3e/enf018kj6srnbprxu2nb99b6jtrseq9b.jpg", source: "https://anwin.ru/project/zhk-chistye-prudy" },
  { name: "JOIS", image: "https://tatlin.ru/MyWeb-Image/table/articles/field/image/content-field/image_content/equality-field/id/equality/1686/width/900/height/610/1/10.2.jpg", source: "https://tatlin.ru/articles/idealnaya_forma_zhiloj_kompleks_jois" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path d={diagonal ? "M7 17 17 7M8 7h9v9" : "M5 12h14M14 7l5 5-5 5"} />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <i />
      <i />
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Здравствуйте! Обращение с сайта.\nИмя: ${form.get("name")}\nКонтакт: ${form.get("contact")}\nО проекте и задаче: ${form.get("message")}`;
    window.open(`https://wa.me/79511651013?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="site-shell">
      <header className={`header ${menuOpen ? "menu-active" : ""}`}>
        <a className="brand" href="#top" aria-label="Екатерина — на главную">
          <span className="brand-mark">Е</span>
          <span className="brand-text">
            Екатерина
            <small>Системы продаж для девелоперов</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#expertise">Экспертиза</a>
          <a href="#directions">Направления</a>
          <a href="#projects">Проекты</a>
          <a href="#about">Об эксперте</a>
        </nav>

        <a className="header-cta" href="#contact">
          Обсудить проект <Arrow diagonal />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Мобильная навигация">
          {[
            ["Экспертиза", "#expertise"],
            ["Направления", "#directions"],
            ["Проекты", "#projects"],
            ["Об эксперте", "#about"],
            ["Форматы работы", "#formats"],
          ].map(([label, href], index) => (
            <a key={href} href={href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-light" href="#contact" onClick={closeMenu}>
          Обсудить проект <Arrow />
        </a>
      </div>

      <main>
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-kicker">
            <span className="line" />
            Стратегия · продажи · управление
          </div>
          <div className="hero-content">
            <div>
              <h1>
                Выстраиваю систему продаж для <em>девелоперских проектов</em>
              </h1>
              <p className="hero-lead">
                Лично вхожу в проект, погружаюсь в продукт и связываю позиционирование, команду,
                процессы и цифровые инструменты в единую систему.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#contact">
                  Обсудить задачу <Arrow />
                </a>
                <a className="text-link" href="#expertise">
                  Как я работаю <span>↓</span>
                </a>
              </div>
            </div>
            <aside className="hero-note">
              <span>Фокус</span>
              <p>
                Премиальная и делюкс-недвижимость
                <br />в Москве и России
              </p>
            </aside>
          </div>
          <div className="hero-index" aria-hidden="true">
            01
          </div>
        </section>

        <section className="section challenges" id="expertise">
          <div className="section-head">
            <p className="eyebrow">Задачи собственника</p>
            <h2>Когда сильному продукту нужна ясная система продаж</h2>
          </div>
          <div className="challenge-layout">
            <p className="intro-copy">
              Я подключаюсь там, где проекту важно увидеть реальную картину, собрать разрозненные
              элементы в систему и определить точные управленческие действия.
            </p>
            <div className="challenge-list">
              {[
                "Продажи не отражают потенциал продукта",
                "Команда по-разному понимает ценность проекта",
                "Сайт и материалы не ведут клиента к решению",
                "CRM даёт данные, но не даёт ясной картины",
                "Проекту требуется перезапуск или новый этап",
              ].map((item, index) => (
                <div className="challenge-row" key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                  <Arrow diagonal />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section approach">
          <div className="section-head section-head-light">
            <p className="eyebrow">Метод</p>
            <h2>Вижу проект целиком — с трёх точек зрения</h2>
          </div>
          <div className="perspectives">
            {[
              {
                number: "01",
                title: "Покупатель",
                text: "Что привлекает внимание, формирует доверие и помогает принять решение.",
              },
              {
                number: "02",
                title: "Менеджер",
                text: "Насколько ясно упакован продукт и удобно ли вести клиента к следующему шагу.",
              },
              {
                number: "03",
                title: "Руководитель",
                text: "Как связаны команда, процессы, инструменты, данные и управленческий результат.",
              },
            ].map((item) => (
              <article className="perspective-card" key={item.number}>
                <span>{item.number}</span>
                <div className="perspective-symbol" aria-hidden="true">
                  <i />
                  <b />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="approach-conclusion">
            Такой ракурс позволяет находить не отдельные симптомы, а причины — и собирать решения,
            которые работают на всех уровнях проекта.
          </p>
        </section>

        <section className="section directions" id="directions">
          <div className="section-head">
            <p className="eyebrow">Направления работы</p>
            <h2>От смысла проекта до ежедневной работы отдела продаж</h2>
          </div>
          <div className="direction-list">
            {directions.map((item, index) => {
              const isOpen = openDirection === index;
              return (
                <article className={`direction ${isOpen ? "is-open" : ""}`} key={item.number}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`direction-${index}`}
                    onClick={() => setOpenDirection(isOpen ? -1 : index)}
                  >
                    <span>{item.number}</span>
                    <h3>{item.title}</h3>
                    <i aria-hidden="true" />
                  </button>
                  <div className="direction-content" id={`direction-${index}`}>
                    <div>
                      <p>{item.text}</p>
                      <strong>{item.result}</strong>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="section-head project-head">
            <div>
              <p className="eyebrow">Проекты и опыт</p>
              <h2>Проекты, с которыми связана профессиональная практика</h2>
            </div>
            <p>
              Работа с продажами и продуктом в рамках профессионального опыта.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.name}>
                <div className="project-visual">
                  <img src={project.image} alt={`Архитектура проекта ${project.name}`} loading="lazy" />
                </div>
                <div className="project-caption">
                  <span>0{index + 1}</span>
                  <h3>{project.name}</h3>
                  <p><a href={project.source} target="_blank" rel="noopener noreferrer">Источник изображения ↗</a></p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about" id="about">
          <div className="about-monogram" aria-hidden="true">
            <span>Е</span>
            <i />
          </div>
          <div className="about-copy">
            <p className="eyebrow">Об эксперте</p>
            <h2>Екатерина — эксперт по продажам недвижимости и созданию систем для девелоперов</h2>
            <p>
              Опыт в премиальной и делюкс-недвижимости позволяет говорить с собственником на языке
              продукта, клиента и бизнеса. Екатерина лично погружается в проект, видит связи между
              деталями и руководит созданием работающей системы продаж.
            </p>
          </div>
          <div className="facts">
            <div>
              <strong>230+</strong>
              <span>личных сделок</span>
            </div>
            <div>
              <strong>13+ млрд ₽</strong>
              <span>личных продаж</span>
            </div>
            <div>
              <strong>
                Москва
                <br />и Россия
              </strong>
              <span>география опыта</span>
            </div>
          </div>
        </section>

        <section className="section outcomes">
          <div className="section-head section-head-light">
            <p className="eyebrow">Результат работы</p>
            <h2>С чем собственник уходит</h2>
          </div>
          <div className="outcome-grid">
            {[
              ["Ясная картина", "Понимание того, что происходит в продажах и почему."],
              ["Точки роста", "Приоритеты без распыления ресурсов на второстепенное."],
              ["План действий", "Последовательность изменений, роли и следующие шаги."],
              [
                "Собранная система",
                "В проектной работе — связанные процессы, команда и инструменты.",
              ],
            ].map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="outcome-note">
            Конкретный результат и глубина проработки фиксируются под выбранный формат и задачу
            проекта.
          </p>
        </section>

        <section className="section formats" id="formats">
          <div className="section-head">
            <p className="eyebrow">Форматы сотрудничества</p>
            <h2>Глубина включения зависит от задачи</h2>
          </div>
          <div className="format-grid">
            {[
              {
                label: "Диагностика",
                title: "Разобраться в ситуации",
                text: "Анализ продукта, клиентского пути, команды, процессов и инструментов. Итоговый состав работы уточняется после первого разговора.",
              },
              {
                label: "Проектная работа",
                title: "Создать или перестроить систему",
                text: "Глубокое погружение и последовательная работа над согласованным контуром продаж.",
              },
              {
                label: "Стратегическое сопровождение",
                title: "Удерживать фокус изменений",
                text: "Регулярная работа с собственником и командой по приоритетам и ключевым решениям.",
              },
            ].map((format, index) => (
              <article key={format.label}>
                <span>
                  0{index + 1} / {format.label}
                </span>
                <h3>{format.title}</h3>
                <p>{format.text}</p>
                <a href="#contact" aria-label={`Обсудить формат: ${format.label}`}>
                  Обсудить формат <Arrow diagonal />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Связь</p>
            <h2>Обсудим, что сейчас происходит в вашем проекте</h2>
            <p>
              Опишите задачу в нескольких предложениях. Екатерина сможет подготовиться к первому
              разговору и сфокусироваться на главном.
            </p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Имя</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Как к вам обращаться"
              />
            </div>
            <div className="field">
              <label htmlFor="contact-value">Телефон или e-mail</label>
              <input
                id="contact-value"
                name="contact"
                type="text"
                required
                placeholder="+7 000 000-00-00"
              />
            </div>
            <div className="field field-wide">
              <label htmlFor="message">О проекте и задаче</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                placeholder="Что важно обсудить?"
              />
            </div>
            <div className="form-footer field-wide">
              <button className="button button-light" type="submit">
                Продолжить в WhatsApp <Arrow />
              </button>
              <p>Откроется WhatsApp с подготовленным сообщением. Чтобы отправить его, нажмите «Отправить» в WhatsApp.</p>
            </div>

          </form>
        </section>
      </main>

      <footer>
        <a className="brand brand-footer" href="#top">
          <span className="brand-mark">Е</span>
          <span className="brand-text">Екатерина</span>
        </a>
        <p>Системы продаж для девелоперских проектов</p>
        <a href="#top" className="to-top">
          Наверх <span>↑</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
