# FRONT-END-PRESENSEE

# 📱 Sistema de Monitoramento de Frequência Escolar

## 📌 Sobre o projeto

Este projeto tem como objetivo desenvolver um sistema inteligente de monitoramento da frequência de alunos do ensino médio, com foco na **identificação precoce de evasão escolar**.

A aplicação permite registrar presença por meio de tecnologia (como biometria facial), analisar padrões de ausência e gerar alertas para ações preventivas por parte da escola.

---

## 🎯 Objetivos

### Objetivo geral

Desenvolver uma solução que auxilie escolas na redução da evasão escolar por meio da análise de frequência.

### Objetivos específicos

* Registrar presença e ausência dos alunos
* Identificar padrões de faltas recorrentes
* Gerar relatórios para gestores escolares
* Emitir alertas de risco de evasão
* Apoiar ações pedagógicas preventivas

---

## 👥 Público-alvo

* Escolas de ensino médio
* Monitores pedagógicos
* Coordenadores
* Secretaria escolar

---

## ⚙️ Funcionalidades

* ✅ Cadastro de alunos
* ✅ Cadastro de turmas
* ✅ Registro de frequência
* ✅ Cadastro biométrico (facial)
* ✅ Dashboard com gráficos
* ✅ Alertas de evasão
* ✅ Relatórios mensais

---

## 🧠 Regras de negócio

* Aluno com mais de **25% de faltas** → Alerta de evasão
* **4 faltas consecutivas** → Alerta imediato
* Relatórios gerados mensalmente

---

## 📊 Indicadores

* Taxa de frequência (%)
* Número de alunos em risco
* Total de faltas por turma
* Evolução mensal de presença

---

## 🏗️ Arquitetura do projeto

```
/monitoramento-escolar
  ├── frontend-mobile/   # App em React Native
  ├── backend/           # API (a definir)
  ├── docs/              # Documentação do projeto
  └── README.md
```

---

## 📱 Frontend Mobile

Desenvolvido com:

* React Native
* UI Kitten

### Estrutura:

```
src/
 ├── components/
 ├── screens/
 ├── navigation/
 ├── services/
 ├── hooks/
 └── utils/
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos

* Node.js instalado
* Expo CLI ou ambiente React Native configurado

### Passos

```bash
# clonar o repositório
git clone https://github.com/seu-repo/monitoramento-escolar.git

# entrar na pasta do frontend
cd frontend-mobile

# instalar dependências
npm install

# rodar o projeto
npm start
```

---

## 🔐 Segurança

* Autenticação de usuários
* Controle de acesso por perfil (professor, gestor)
* Proteção de dados conforme LGPD
* Uso de variáveis de ambiente (.env)

---

## 👨‍💻 Equipe

* Miguel Augusto
* Echilin Taina
* Ygor de Tárcio
* Maysa Clara
* Ludmylla Dias
* Matheus Vinnycius
* Pedro Henrique Jerônimo
* Gabriel Soares

---

## 📌 Status do projeto

🚧 Em desenvolvimento (Projeto Integrador IV)

---

## 💡 Contribuição

1. Crie uma branch (`feature/nome-da-feature`)
2. Faça suas alterações
3. Abra um Pull Request

---

## 📄 Licença

Este projeto é acadêmico e sem fins lucrativos.
