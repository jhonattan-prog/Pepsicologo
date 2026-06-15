# Landing Page — Psicólogo Pedro Francisco

Este repositório contém o código-fonte de uma landing page profissional, responsiva, moderna e otimizada para o psicólogo **Pedro Francisco (CRP 06/187751)**. O objetivo principal do site é transmitir acolhimento, credibilidade e facilitar o agendamento de consultas (online e presenciais) via WhatsApp e formulário de contato.

---

## 🎨 Identidade Visual & Cores (Logo-Tailored)
O tema do site foi desenvolvido especificamente com base nas cores extraídas da identidade visual da logomarca oficial do profissional:
* **Terracota (`#bb6031`)**: Cor primária para destaques e botões de chamada de ação (CTA).
* **Creme Linho (`#ede7db`)**: Cor de fundo principal da landing page para manter o tom calmo e acolhedor.
* **Marrom Cacau (`#745649`)**: Utilizado em detalhes secundários, ícones e cabeçalhos.
* **Chocolate Profundo (`#3c2d27`)**: Cor de alto contraste para textos de leitura, proporcionando ótima acessibilidade e legibilidade.

---

## 🛠️ Tecnologias Utilizadas
* **HTML5**: Estruturação semântica, acessível (tags ARIA) e otimizada para SEO.
* **CSS3**: Design System responsivo baseado em variáveis CSS customizadas, animações fluidas (Intersection Observer) e layouts flexíveis.
* **JavaScript (ES6+)**: Interações dinâmicas, validação do formulário de contato, máscara de telefone automática e navegação por teclado.

---

## 📁 Estrutura de Arquivos
```
LandingPagePepsi/
│
├── assets/
│   └── images/
│       ├── foto-profissional.png   # Foto do psicólogo Pedro Francisco (hero)
│       └── foto-consultorio.png    # Foto do consultório físico (sobre)
│
├── .gitignore                      # Regras de exclusão para versionamento seguro
├── index.html                      # Conteúdo e estrutura principal da página
├── README.md                       # Documentação do projeto
├── script.js                       # Lógica de animações e interações da página
└── styles.css                      # Design system e folhas de estilo responsivas
```

---

## 🚀 Como Executar Localmente

### Método 1: Abertura Direta
Dê um duplo clique no arquivo `index.html` para abri-lo diretamente em qualquer navegador moderno.

### Método 2: Servidor Local Estático (Recomendado para verificar cache e requisições)
Se possuir o Node.js instalado, você pode executar o servidor estático usando o `npx`:
```bash
# Executa um servidor local na porta 8080
npx http-server . -p 8080 -c-1
```
Após executar, acesse no seu navegador: `http://localhost:8080`

---

## 💻 Conexão e Envio para o GitHub

Para enviar este repositório local para o seu repositório remoto criado no GitHub, execute os seguintes comandos no seu terminal na pasta raiz do projeto:

```bash
# 1. Adiciona o repositório remoto oficial
git remote add origin https://github.com/jhonattan-prog/Pepsicologo.git

# 2. Define a branch principal local como 'main'
git branch -M main

# 3. Envia o código inicial e estabelece a conexão
git push -u origin main
```

---

## 🔒 Auditoria de Segurança
Durante a preparação deste repositório, foi realizada uma auditoria de segurança de segredos e credenciais locais:
* **Status**: ✅ **Livre de segredos e chaves expostas**.
* **Observações**: O link de envio do WhatsApp é público e o mapa integrado não utiliza chaves de API restritas. Caso venha a integrar sistemas que exijam tokens privados, utilize o `.gitignore` configurado para não subir arquivos `.env` confidenciais.

---

## ⚖️ Conformidade Ética
O site segue estritamente o **Código de Ética Profissional do Psicólogo (Conselho Federal de Psicologia — CFP)**:
* Sem promessas de cura, garantia de resultados ou divulgações sensacionalistas.
* Sem depoimentos/relatos de pacientes (proibido pelo CFP).
* Exibição clara e constante do nome profissional e de seu respectivo número de registro (**CRP 06/187751**).
