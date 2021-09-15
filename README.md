<h1 align="center">
  <p>Fale Mais by Telzir</p>
</h1>

## 💻 Project

Fale Mais is an application developed by Telzir Telecom to help its customers calculate the price of their phone calls.

## 🚀 Technologies

This project was developed with the following technologies:

- EJS
- TypeScript
- Node.js
- Express
- SQLite
- TypeORM
- JWT
- Winston

## 🧰 Setup

#### 1. Clone the repo

```sh
$ git clone https://github.com/ercioalendre/telzir-fale-mais.git
$ cd telzir-fale-mais
```

or [download it here](https://github.com/ercioalendre/telzir-fale-mais/archive/refs/heads/main.zip).

#### 2. Install necessary dependencies

```sh
# with npm
$ npm i --package-lock-only
$ npm ci

# with yarn
$ rm -rf node_modules
$ yarn install --frozen-lockfile
```

#### 3. Run migrations

```sh
# with npm
$ npm run typeorm migration:run

# with yarn
$ yarn typeorm migration:run
```

#### 4. Start the server

```sh
# with npm
npm run dev

# with yarn
yarn dev
```

#### 5. All set and done

That's it! You can now see it up and running on [http://localhost:3000](http://localhost:3000)

#### 6. Testings

The application is being tested by Jest.

```sh
# with npm
npm run test

# with yarn
yarn test
```

## :memo: License

This project is under MIT license. See the file [LICENSE](LICENSE) for further details.
