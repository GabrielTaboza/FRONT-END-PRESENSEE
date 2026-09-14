import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Alunos.css"
import { useMemo, useState } from "react"

function Alunos() {

  const [alunos] = useState([

    {
      nome: "Maria Joaquina",
      matricula: "001",
      turma: "3A",
      frequencia: 95,
      risco: "Baixo"
    },

    {
      nome: "João Silva",
      matricula: "002",
      turma: "2B",
      frequencia: 87,
      risco: "Baixo"
    },

    {
      nome: "Marcos Heitor",
      matricula: "003",
      turma: "3A",
      frequencia: 82,
      risco: "Médio"
    },

    {
      nome: "Ana Beatriz",
      matricula: "004",
      turma: "1A",
      frequencia: 76,
      risco: "Médio"
    },

    {
      nome: "Pedro Henrique",
      matricula: "005",
      turma: "2B",
      frequencia: 66,
      risco: "Alto"
    },

    {
      nome: "Gabriel Soares",
      matricula: "006",
      turma: "2B",
      frequencia: 65,
      risco: "Alto"
    }

  ])


  // =========================
  // FILTROS
  // =========================

  const [busca, setBusca] = useState("")

  const [turmaSelecionada, setTurmaSelecionada] =
    useState("")

  const [riscoSelecionado, setRiscoSelecionado] =
    useState("")

  const [frequenciaSelecionada, setFrequenciaSelecionada] =
    useState("")


  // =========================
  // ALUNOS FILTRADOS
  // =========================

  const alunosFiltrados = useMemo(() => {

    return alunos.filter((aluno) => {

      const nomeCorresponde =
        aluno.nome
          .toLowerCase()
          .includes(busca.toLowerCase())


      const turmaCorresponde =
        turmaSelecionada === "" ||
        aluno.turma === turmaSelecionada


      const riscoCorresponde =
        riscoSelecionado === "" ||
        aluno.risco === riscoSelecionado


      let frequenciaCorresponde = true


      if (frequenciaSelecionada === "acima-80") {

        frequenciaCorresponde =
          aluno.frequencia > 80

      }


      if (frequenciaSelecionada === "70-80") {

        frequenciaCorresponde =
          aluno.frequencia >= 70 &&
          aluno.frequencia <= 80

      }


      if (frequenciaSelecionada === "abaixo-70") {

        frequenciaCorresponde =
          aluno.frequencia < 70

      }


      return (
        nomeCorresponde &&
        turmaCorresponde &&
        riscoCorresponde &&
        frequenciaCorresponde
      )

    })

  }, [
    alunos,
    busca,
    turmaSelecionada,
    riscoSelecionado,
    frequenciaSelecionada
  ])


  // =========================
  // POPUPS
  // =========================

  const [alunoSelecionado, setAlunoSelecionado] =
    useState(null)

  const [mostrarFrequencia, setMostrarFrequencia] =
    useState(false)


  // =========================
  // MÊS SELECIONADO
  // =========================

  const [mesSelecionado, setMesSelecionado] =
    useState("Agosto")


  // =========================
  // MESES
  // =========================

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]


  // =========================
  // DADOS DOS MESES
  // =========================

  const dadosFrequencia = {

    Janeiro: {
      dias: 31,
      faltas: 2
    },

    Fevereiro: {
      dias: 28,
      faltas: 3
    },

    Março: {
      dias: 31,
      faltas: 2
    },

    Abril: {
      dias: 30,
      faltas: 4
    },

    Maio: {
      dias: 31,
      faltas: 3
    },

    Junho: {
      dias: 30,
      faltas: 4
    },

    Julho: {
      dias: 31,
      faltas: 5
    },

    Agosto: {
      dias: 15,
      faltas: 3
    },

    Setembro: {
      dias: 30,
      faltas: 2
    },

    Outubro: {
      dias: 31,
      faltas: 3
    },

    Novembro: {
      dias: 30,
      faltas: 2
    },

    Dezembro: {
      dias: 31,
      faltas: 1
    }

  }


  // =========================
  // ABRIR ALUNO
  // =========================

  function abrirAluno(aluno) {

    setAlunoSelecionado(aluno)

  }


  // =========================
  // FECHAR POPUP
  // =========================

  function fecharAluno() {

    setAlunoSelecionado(null)

    setMostrarFrequencia(false)

  }


  // =========================
  // ABRIR FREQUÊNCIA
  // =========================

  function abrirFrequencia() {

    setMostrarFrequencia(true)

  }


  // =========================
  // VOLTAR
  // =========================

  function voltarParaAluno() {

    setMostrarFrequencia(false)

  }


  // =========================
  // GERAR DIAS DO MÊS
  // =========================

  const dadosMesAtual =
    dadosFrequencia[mesSelecionado]


  const diasDoMes = useMemo(() => {

    const dias = []

    for (
      let dia = 1;
      dia <= dadosMesAtual.dias;
      dia++
    ) {

      const faltou =
        dia % 7 === 0 ||
        dia === 5 ||
        dia === 12


      dias.push({
        dia: dia,
        status: faltou ? "falta" : "presente"
      })

    }

    return dias

  }, [dadosMesAtual])


  // =========================
  // PERCENTUAL DO MÊS
  // =========================

  const percentualFrequencia = useMemo(() => {

    const presentes =
      diasDoMes.filter(
        (dia) => dia.status === "presente"
      ).length

    return Math.round(
      (presentes / diasDoMes.length) * 100
    )

  }, [diasDoMes])


  return (

    <DashboardLayout>


      <div className="alunos-page">


        {/* =========================
            CABEÇALHO
        ========================= */}

        <div className="alunos-header">

          <div>

            <h1>
              Olá, Visitante!
            </h1>

            <p>
              Alunos
            </p>

          </div>

        </div>


        {/* =========================
            BUSCA
        ========================= */}

        <input
          className="search-aluno"
          type="text"
          placeholder="Buscar aluno..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />


        {/* =========================
            FILTROS
        ========================= */}

        <div className="filters">


          <select
            value={turmaSelecionada}
            onChange={(e) =>
              setTurmaSelecionada(e.target.value)
            }
          >

            <option value="">
              Turma
            </option>

            <option value="1A">
              1A
            </option>

            <option value="2B">
              2B
            </option>

            <option value="3A">
              3A
            </option>

          </select>


          <select
            value={riscoSelecionado}
            onChange={(e) =>
              setRiscoSelecionado(e.target.value)
            }
          >

            <option value="">
              Nível de risco
            </option>

            <option value="Baixo">
              Baixo
            </option>

            <option value="Médio">
              Médio
            </option>

            <option value="Alto">
              Alto
            </option>

          </select>


          <select
            value={frequenciaSelecionada}
            onChange={(e) =>
              setFrequenciaSelecionada(e.target.value)
            }
          >

            <option value="">
              Frequência
            </option>

            <option value="acima-80">
              Acima de 80%
            </option>

            <option value="70-80">
              Entre 70% e 80%
            </option>

            <option value="abaixo-70">
              Abaixo de 70%
            </option>

          </select>


        </div>


        {/* =========================
            TABELA
        ========================= */}

        <table className="students-table">

          <thead>

            <tr>

              <th>
                Aluno
              </th>

              <th>
                Turma
              </th>

              <th>
                Frequência
              </th>

              <th>
                Risco
              </th>

            </tr>

          </thead>


          <tbody>

            {alunosFiltrados.map((aluno) => (

              <tr
                key={aluno.matricula}
                onClick={() => abrirAluno(aluno)}
              >

                <td>
                  {aluno.nome}
                </td>

                <td>
                  {aluno.turma}
                </td>

                <td>
                  {aluno.frequencia}%
                </td>

                <td>

                  <span
                    className={
                      `risk-status ${aluno.risco.toLowerCase()}`
                    }
                  >

                    <span className="risk-dot"></span>

                    {aluno.risco}

                  </span>

                </td>

              </tr>

            ))}


            {alunosFiltrados.length === 0 && (

              <tr>

                <td colSpan="4">
                  Nenhum aluno encontrado.
                </td>

              </tr>

            )}

          </tbody>

        </table>


        {/* =========================
            PAGINAÇÃO
        ========================= */}

        <div className="pagination">

          <span>
            {alunosFiltrados.length} aluno(s) encontrado(s)
          </span>

          <button>
            ‹
          </button>

          <button className="current-page">
            1
          </button>

          <span>
            de 1
          </span>

          <button>
            ›
          </button>

        </div>


      </div>


      {/* ==================================================
          POPUP DO ALUNO
      ================================================== */}

      {alunoSelecionado && !mostrarFrequencia && (

        <div
          className="student-modal-overlay"
          onClick={fecharAluno}
        >

          <div
            className="student-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={fecharAluno}
            >
              ×
            </button>


            <div className="student-modal-header">

              <div className="student-avatar">
                👤
              </div>


              <div>

                <h2>
                  {alunoSelecionado.nome}
                </h2>

                <p>
                  {alunoSelecionado.turma}
                </p>

              </div>


              <span
                className={
                  `modal-risk ${alunoSelecionado.risco.toLowerCase()}`
                }
              >
                Risco {alunoSelecionado.risco}
              </span>

            </div>


            <div className="student-summary">

              <div>

                <strong>
                  5.0
                </strong>

                <span>
                  Média geral
                </span>

              </div>


              <div>

                <strong>
                  4
                </strong>

                <span>
                  Ocorrências
                </span>

              </div>


              <button
                className="frequency-summary"
                onClick={abrirFrequencia}
              >

                <strong>
                  {alunoSelecionado.frequencia}%
                </strong>

                <span>
                  Frequência geral
                </span>

              </button>

            </div>


            <div className="risk-reason">

              <h3>
                Por que este aluno está em risco?
              </h3>

              <div>
                🟡 Frequência caindo progressivamente
              </div>

              <div>
                🟡 Queda das notas
              </div>

              <div>
                🟡 Faltas recentes
              </div>

              <div>
                🟡 Ocorrências recentes
              </div>

            </div>


            <div className="student-actions">

              <button>
                📝
                <span>
                  Notas
                </span>
              </button>

              <button>
                📋
                <span>
                  Ocorrências
                </span>
              </button>

              <button>
                📖
                <span>
                  Diário do monitor
                </span>
              </button>

            </div>


          </div>

        </div>

      )}


      {/* ==================================================
          POPUP DE FREQUÊNCIA
      ================================================== */}

      {alunoSelecionado && mostrarFrequencia && (

        <div
          className="student-modal-overlay"
          onClick={fecharAluno}
        >

          <div
            className="frequency-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={fecharAluno}
            >
              ×
            </button>


            {/* =========================
                CABEÇALHO DO ALUNO
            ========================= */}

            <div className="frequency-student-header">

              <div className="student-avatar">
                👤
              </div>


              <div>

                <h2>
                  {alunoSelecionado.nome}
                </h2>

                <p>
                  {alunoSelecionado.turma}
                </p>

              </div>


              <span
                className={
                  `modal-risk ${alunoSelecionado.risco.toLowerCase()}`
                }
              >
                Risco {alunoSelecionado.risco}
              </span>

            </div>


            {/* =========================
                TÍTULO E MÊS
            ========================= */}

            <div className="frequency-title">

              <div>

                <h2>
                  Frequência Geral
                </h2>


                <select
                  className="frequency-month-select"
                  value={mesSelecionado}
                  onChange={(e) =>
                    setMesSelecionado(e.target.value)
                  }
                >

                  {meses.map((mes) => (

                    <option
                      key={mes}
                      value={mes}
                    >
                      {mes}
                    </option>

                  ))}

                </select>

              </div>


              <div className="frequency-circle">

                <span>
                  {percentualFrequencia}%
                </span>

              </div>

            </div>


            {/* =========================
                DIAS DA SEMANA
            ========================= */}

            <div className="frequency-week">

              <span>seg</span>
              <span>ter</span>
              <span>qua</span>
              <span>qui</span>
              <span>sex</span>

            </div>


            {/* =========================
                DIAS
            ========================= */}

            <div className="frequency-grid">

              {diasDoMes.map((dia) => (

                <div
                  className="frequency-day"
                  key={dia.dia}
                >

                  <span className="day-number">
                    {dia.dia}
                  </span>


                  <span
                    className={
                      `day-status ${dia.status}`
                    }
                  >

                    {dia.status === "presente"
                      ? "✓"
                      : "×"
                    }

                  </span>

                </div>

              ))}

            </div>


            {/* =========================
                VOLTAR
            ========================= */}

            <button
              className="back-frequency"
              onClick={voltarParaAluno}
            >
              ← Voltar
            </button>


          </div>

        </div>

      )}

    </DashboardLayout>

  )

}

export default Alunos