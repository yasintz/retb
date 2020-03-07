<h1 align="center">Welcome to retb 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-12.14.1-blue.svg" />
  <img src="https://img.shields.io/badge/yarn-1.21.1-blue.svg" />
  <img src="https://img.shields.io/badge/PosgreSQL-12.2.0-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> MVC, Razzle, Express and typeorm boilerplate

## Prerequisites

- node 12.14.1
- yarn 1.21.1
- PostgreSQL 12.2

# Environment Variables

| Değer                 | Açıklama                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| PORT                  | Uygulamanin calisacagi port default olarak `3000` ayarlidir                                       |
| TOKEN_SECRET_KEY      | Token olusturulurken kullanilacak gizli anahtar                                                   |
| SESSION_SECRET_KEY    | Session olusturulurken kullanilacak gizli anahtar                                                 |
| PASSWORD_SECRET_KEY   | Sifre olusturulurken kullanilacak gizli anahtar                                                   |
| GOOGLE_CLIENT_ID      | Google tarafindan verilen ve google ile giris yapabilmek icin kullanilcak client id               |
| GOOGLE_CLIENT_SECRET  | Google tarafindan verilen client secret                                                           |
| GOOGLE_CALLBACK_ROUTE | Google'a girilen callback degeri                                                                  |
| GITHUB_CLIENT_ID      | Github tarafindan verilen ve github ile giris yapabilmek icin kullanilcak client id               |
| GITHUB_CLIENT_SECRET  | Github tarafindan verilen client secret                                                           |
| GITHUB_CALLBACK_ROUTE | Github'a girilen callback degeri                                                                  |
| DATABASE_URL          | Postgresql connection string'i ornek: `postgres://<db-name>:<password>@<db-host>/<db-name>`       |
| SERVER_URL            | uygulamanin calistigi host adresi development modunda iseniz http://localhost:3000 ayarlanmalidir |

# Technologies

- [React](https://reactjs.org/)
- [Styled-Components](https://styled-components.com/)
- [Razzle](https://github.com/jaredpalmer/razzle)
- [Passportjs](http://www.passportjs.org/)
- [Typeorm](https://typeorm.io/#/)
- [Postgresql](https://www.postgresql.org/)
- [Node Cache](https://www.npmjs.com/package/node-cache)
- [Socket.io](https://socket.io/)
- [Jest](https://jestjs.io/)

## Usage

```sh
git clone https://github.com/yasintz/retb.git <your project name>
```

```sh
cd  <your project name>
```

install depencencies

```sh
yarn install
```

start project in development mode

```sh
yarn dev
```

## Run tests

```sh
yarn run test
```

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
