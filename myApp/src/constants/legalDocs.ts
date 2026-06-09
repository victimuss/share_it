export const PRIVACY_HTML = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Политика конфиденциальности | Spark Edu</title>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #2d3748;
            --accent-color: #4c51bf;
            --secondary-color: #718096;
            --border-color: #e2e8f0;
            --code-bg: #f7fafc;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--bg-color);
            margin: 0;
            padding: 40px 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        header {
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: 20px;
            margin-bottom: 40px;
        }

        h1 {
            margin: 0;
            font-size: 2rem;
            letter-spacing: -0.5px;
        }

        h2 {
            font-size: 1.4rem;
            margin-top: 30px;
            color: var(--accent-color);
        }

        section {
            margin-bottom: 25px;
        }

        ul {
            padding-left: 20px;
        }

        li {
            margin-bottom: 10px;
        }

        code {
            background: var(--code-bg);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.9em;
        }

        .highlight {
            background-color: #fffaf0;
            border-left: 4px solid #ed8936;
            padding: 15px;
            margin: 20px 0;
            font-style: italic;
        }

        footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            font-size: 0.9rem;
            color: var(--secondary-color);
            text-align: center;
        }
    </style>
</head>
<body>

<div class="container">
    <header>
        <h1>Политика конфиденциальности Spark Edu</h1>
        <p>Последнее обновление: Июнь 2026</p>
    </header>

    <section>
        <p>Настоящая Политика конфиденциальности описывает, как платформа <strong>Spark Edu</strong> ("мы", "платформа", "сервис") обрабатывает данные пользователей. Spark Edu — это образовательная платформа нового поколения, построенная на принципах Trustless-архитектуры и максимальной приватности.</p>
    </section>

    <section>
        <h2>1. Отсутствие сбора персональных данных (PII)</h2>
        <p>В отличие от традиционных платформ, Spark Edu <strong>не собирает</strong> лично идентифицируемую информацию (PII), такую как:</p>
        <ul>
            <li>Имена и фамилии;</li>
            <li>Адреса электронной почты;</li>
            <li>Номера телефонов;</li>
            <li>Пароли.</li>
        </ul>
    </section>

    <section>
        <h2>2. Идентификация и безопасность (Trustless Architecture)</h2>
        <p>Ваша личность в системе управляется с помощью <strong>Zero-Knowledge Proofs (ZKP) протокола Шнорра</strong> и мнемонических фраз стандарта <strong>BIP-39</strong>.</p>
        <ul>
            <li>В процессе входа в систему сервер получает лишь математическое доказательство того, что вы владеете ключом.</li>
            <li><strong>Ваша секретная seed-фраза никогда не передается по сети и не сохраняется на наших серверах.</strong></li>
        </ul>
    </section>

    <section>
        <h2>3. Обработка контента и ИИ</h2>
        <p>Платформа использует интеграции с ИИ (Gemini Pro, Groq/Llama 3) для генерации образовательного контента и локальные модели (BERT) для модерации (Edge NLP Moderation).</p>
        <ul>
            <li>Весь создаваемый контент модерируется непосредственно на нашей инфраструктуре для обеспечения 100% суверенитета данных.</li>
            <li>Мы не передаем ваши личные идентификаторы сторонним ИИ-сервисам.</li>
        </ul>
    </section>

    <section>
        <h2>4. Интеграция с Telegram</h2>
        <p>Для пользователей, желающих получать уведомления (через бота <code>@spark_edu_bot</code>), мы собираем минимально необходимый набор данных:</p>
        <ul>
            <li><strong>Telegram Chat ID</strong> для отправки сообщений;</li>
            <li>Внутренний <strong>User ID</strong> платформы;</li>
            <li>Предпочтения по категориям контента.</li>
        </ul>
        <div class="highlight">
            Эти данные используются исключительно для функционала уведомлений и не передаются третьим лицам. Вы можете отозвать доступ в любой момент, отвязав бота.
        </div>
    </section>

    <section>
        <h2>5. Технический мониторинг</h2>
        <p>Для обеспечения стабильной работы приложения и отслеживания ошибок мы можем использовать системы мониторинга (например, Sentry). Сбор логов и информации о сбоях происходит полностью анонимно и не привязывается к вашей личности.</p>
    </section>

    <section>
        <h2>6. Условия демо-доступа</h2>
        <p>Текущая версия платформы предоставляется в режиме ознакомительного "Демо-доступа". В рамках этого этапа:</p>
        <ul>
            <li>Мы оставляем за собой право в любой момент очистить базу данных и удалить все созданные материалы.</li>
            <li>Для входа может использоваться публичный демо-аккаунт (с предоставленной seed-фразой). Просим не размещать конфиденциальную информацию при использовании общих демо-аккаунтов.</li>
        </ul>
    </section>

    <section>
        <h2>7. Ваши права</h2>
        <p>Поскольку система не хранит ваши персональные данные, мы не можем "удалить ваш аккаунт" в традиционном смысле — ваш аккаунт существует только в виде криптографического ключа на вашем устройстве. Вы можете в любой момент прекратить использование приложения. Данные Telegram-бота могут быть удалены по вашему запросу или путем отвязки аккаунта.</p>
    </section>

    <footer>
        <p>&copy; 2026 Spark Edu. Сделано с помощью чистого CSS и прямых рук. 🏎️💨</p>
    </footer>
</div>

</body>
</html>`;

export const TERMS_HTML = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Условия использования | Spark Edu</title>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #2d3748;
            --accent-color: #4c51bf;
            --secondary-color: #718096;
            --border-color: #e2e8f0;
            --code-bg: #f7fafc;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--bg-color);
            margin: 0;
            padding: 40px 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        header {
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: 20px;
            margin-bottom: 40px;
        }

        h1 {
            margin: 0;
            font-size: 2rem;
            letter-spacing: -0.5px;
        }

        h2 {
            font-size: 1.4rem;
            margin-top: 30px;
            color: var(--accent-color);
        }

        section {
            margin-bottom: 25px;
        }

        ul {
            padding-left: 20px;
        }

        li {
            margin-bottom: 10px;
        }

        code {
            background: var(--code-bg);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.9em;
        }

        .highlight {
            background-color: #fffaf0;
            border-left: 4px solid #ed8936;
            padding: 15px;
            margin: 20px 0;
            font-style: italic;
            color: #c05621;
        }

        footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            font-size: 0.9rem;
            color: var(--secondary-color);
            text-align: center;
        }
    </style>
</head>
<body>

<div class="container">
    <header>
        <h1>Условия использования Spark Edu (Демо-версия)</h1>
        <p>Последнее обновление: Июнь 2026</p>
    </header>

    <section>
        <p>Добро пожаловать в <strong>Spark Edu</strong> — платформу микро-обучения на базе ИИ с Trustless-архитектурой. Пожалуйста, внимательно ознакомьтесь с настоящими Условиями перед использованием нашего приложения в режиме демо-доступа.</p>
    </section>

    <section>
        <h2>1. Общие положения и Демо-доступ</h2>
        <p>Текущая версия Spark Edu предоставляется "как есть" (as is) исключительно в ознакомительных целях (Демо-доступ).</p>
        <ul>
            <li>Мы не гарантируем бесперебойную работу, сохранность ваших данных или отсутствие ошибок.</li>
            <li>В рамках тестирования база данных, включая все ваши достижения и созданные карточки, может быть очищена в любой момент без предварительного уведомления.</li>
        </ul>
    </section>

    <section>
        <h2>2. Безопасность и ответственность за доступ</h2>
        <p>Spark Edu использует архитектуру нулевого разглашения (ZKP). Мы <strong>не храним</strong> ваши пароли или seed-фразы (BIP-39).</p>
        <ul>
            <li><strong>Вы несете полную и единоличную ответственность за сохранность вашей seed-фразы.</strong></li>
            <li>В случае утери seed-фразы восстановление доступа к вашему аккаунту и данным <strong>технически невозможно</strong>. Разработчики не смогут вам помочь.</li>
        </ul>
    </section>

    <section>
        <h2>3. Контент, генерируемый ИИ</h2>
        <p>Платформа использует искусственный интеллект (в т.ч. Gemini Pro, Groq) для автоматического структурирования и создания образовательного контента.</p>
        <ul>
            <li>ИИ может допускать ошибки, "галлюцинации" или выдавать неточную информацию.</li>
            <li>Вы соглашаетесь использовать генерируемые материалы на свой страх и риск и обязуетесь критически оценивать их достоверность.</li>
        </ul>
    </section>

    <section>
        <h2>4. Модерация и правила поведения</h2>
        <p>Несмотря на приватный характер платформы, мы используем локальные NLP-модели (Edge NLP Moderation) для автоматической проверки пользовательского контента.</p>
        <ul>
            <li>Запрещается создавать, загружать или распространять контент, нарушающий законодательство, содержащий призывы к насилию, экстремизму, или нарушающий авторские права.</li>
            <li>Платформа оставляет за собой право блокировать доступ к сервису или удалять контент, который система модерации сочтет недопустимым.</li>
        </ul>
    </section>

    <section>
        <h2>5. Интеллектуальная собственность</h2>
        <p>Spark Edu предоставляет вам ограниченное, неэксклюзивное право на использование приложения в личных некоммерческих целях. Все права на исходный код, дизайн и архитектуру приложения принадлежат разработчикам проекта.</p>
    </section>

    <section>
        <h2>6. Ограничение ответственности</h2>
        <p>Разработчики Spark Edu ни при каких обстоятельствах не несут ответственности за:</p>
        <ul>
            <li>Любые прямые или косвенные убытки, возникшие в результате использования или невозможности использования сервиса;</li>
            <li>Утерю доступа к аккаунту вследствие потери seed-фразы;</li>
            <li>Ошибки или неточности в образовательном контенте, сгенерированном ИИ.</li>
        </ul>
        <div class="highlight">
            Продолжая использование платформы (в том числе скачивая сборку для Android или используя предоставленные тестовые данные), вы подтверждаете свое согласие с настоящими Условиями использования и Политикой конфиденциальности.
        </div>
    </section>

    <footer>
        <p>&copy; 2026 Spark Edu. Сделано с помощью чистого CSS и прямых рук. 🏎️💨</p>
    </footer>
</div>

</body>
</html>`;
