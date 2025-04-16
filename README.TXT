
# 🛒 E-commerce API (Spring Boot)

API REST para gerenciamento de produtos de um sistema de e-commerce, desenvolvida com Spring Boot.

---

## ⚙️ Requisitos

- ✅ Java 17 instalado  
- ❌ Não é necessário instalar Gradle  
- ❌ Não é necessário acesso à internet após clonar o projeto

---

## 🚀 Como rodar o projeto offline

### 1. Clone este repositório (ou baixe como `.zip`)

```bash
git clone https://github.com/seu-usuario/ecommerce.git
cd ecommerce
```

### 2. Execute o comando abaixo para iniciar a aplicação:

#### 💻 No Windows:

```cmd
gradlew.bat bootRun --offline
```

#### 💻 No Linux/macOS:

```bash
./gradlew bootRun --offline
```

✅ Esse comando irá iniciar o servidor local e carregar a aplicação com todas as dependências offline.

---

## 🌐 Como acessar a documentação da API

Após iniciar a aplicação, abra seu navegador e acesse:

👉 **http://localhost:9999/docs**

Você verá a interface interativa do **Swagger UI**, onde poderá:

- Visualizar todos os endpoints disponíveis
- Testar requisições `GET`, `POST`, `DELETE`, etc.
- Conferir os dados de entrada e saída de cada rota

---

## 📦 Endpoints disponíveis

| Método | Caminho             | Descrição                     |
|--------|---------------------|-------------------------------|
| GET    | `/produtos`         | Lista todos os produtos       |
| POST   | `/produtos`         | Cadastra um novo produto      |
| DELETE | `/produtos/{id}`    | Remove um produto pelo ID     |

---

## 🔁 Alternativa: Rodar a aplicação como `.jar`

Você também pode executar a aplicação sem o Gradle, usando o arquivo `.jar` já gerado:

```bash
java -jar build/libs/ecommerce-0.0.1-SNAPSHOT.jar
```

---

## 📁 Estrutura do projeto

```
├── src/
│   ├── main/
│   │   └── java/br/com/peer/ecommerce/
│   │       ├── controller/
│   │       ├── model/
│   │       ├── repository/
│   │       └── service/
├── build.gradle
├── gradlew / gradlew.bat
├── gradle/wrapper/
├── .gradle/ ✅ incluso para rodar offline
├── build/ ✅ incluso com .jar pré-compilado
```