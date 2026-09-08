import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Alunos.css"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

function Alunos() {

  const navigate = useNavigate()


  /* =========================
     ALUNOS DE DEMONSTRAÇÃO
  ========================= */

  const [alunos, setAlunos] = useState(() => {

    const nomes = [
      "Maria Joaquina",
      "João Silva",
      "Marcos Heitor",
      "Ana Beatriz",
      "Pedro Henrique",
      "Gabriel Soares",
      "Miguel Augusto",
      "Lucas Almeida",
      "Juliana Santos",
      "Beatriz Oliveira"
    ]


    const turmas = [
      "1A",
      "2B",
      "3A"
    ]


    const frequencias = [
      95,
      87,
      82,
      76,
      66,
      65,
      92,
      88,
      74,
      98
    ]


    return Array.from(
      { length: 350 },
      (_, index) => {

        const frequencia =
          frequencias[index % frequencias.length]


        let risco = "Baixo"


        if (frequencia < 70) {

          risco = "Alto"

        } else if (frequencia < 85) {

          risco = "Médio"

        }


        return {

          nome:
            nomes[index % nomes.length],

          matricula:
            String(index + 1).padStart(3, "0"),

          turma:
            turmas[index % turmas.length],

          frequencia:
            frequencia,

          risco:
            risco

        }

      }
    )

  })


  /* =========================
     FILTROS
  ========================= */

  const [busca, setBusca] = useState("")

  const [turmaFiltro, setTurmaFiltro] =
    useState("")

  const [riscoFiltro, setRiscoFiltro] =
    useState("")

  const [frequenciaFiltro, setFrequenciaFiltro] =
    useState("")


  /* =========================
     PAGINAÇÃO
  ========================= */

  const [paginaAtual, setPaginaAtual] =
    useState(1)

  const alunosPorPagina = 5


  /* =========================
     EDIÇÃO
  ========================= */

  const [alunoEditando, setAlunoEditando] =
    useState(null)


  /* =========================
     FILTRAGEM
  ========================= */

  const alunosFiltrados = useMemo(() => {

    return alunos.filter((aluno) => {

      const correspondeBusca =
        aluno.nome
          .toLowerCase()
          .includes(busca.toLowerCase())


      const correspondeTurma =
        turmaFiltro === "" ||
        aluno.turma === turmaFiltro


      const correspondeRisco =
        riscoFiltro === "" ||
        aluno.risco === riscoFiltro


      let correspondeFrequencia = true


      if (frequenciaFiltro === "alta") {

        correspondeFrequencia =
          aluno.frequencia >= 85

      }


      if (frequenciaFiltro === "media") {

        correspondeFrequencia =
          aluno.frequencia >= 70 &&
          aluno.frequencia < 85

      }


      if (frequenciaFiltro === "baixa") {

        correspondeFrequencia =
          aluno.frequencia < 70

      }


      return (
        correspondeBusca &&
        correspondeTurma &&
        correspondeRisco &&
        correspondeFrequencia
      )

    })

  }, [
    alunos,
    busca,
    turmaFiltro,
    riscoFiltro,
    frequenciaFiltro
  ])


  /* =========================
     PAGINAÇÃO
  ========================= */

  const totalPaginas =
    Math.ceil(
      alunosFiltrados.length /
      alunosPorPagina
    )


  const indiceInicial =
    (paginaAtual - 1) *
    alunosPorPagina


  const alunosPagina =
    alunosFiltrados.slice(
      indiceInicial,
      indiceInicial + alunosPorPagina
    )


  /* =========================
     ALTERAR FILTRO
  ========================= */

  function alterarFiltro(setter, valor) {

    setter(valor)

    setPaginaAtual(1)

  }


  /* =========================
     EDITAR
  ========================= */

  function editarAluno(aluno) {

    setAlunoEditando({
      ...aluno
    })

  }


  /* =========================
     SALVAR EDIÇÃO
  ========================= */

  function salvarEdicao() {

    setAlunos(

      alunos.map((aluno) => {

        if (
          aluno.matricula ===
          alunoEditando.matricula
        ) {

          return alunoEditando

        }

        return aluno

      })

    )

    setAlunoEditando(null)

  }


  /* =========================
     EXCLUIR
  ========================= */

  function excluirAluno(matricula) {

    const confirmar =
      window.confirm(
        "Tem certeza que deseja excluir este aluno?"
      )


    if (!confirmar) {
      return
    }


    setAlunos(

      alunos.filter(
        (aluno) =>
          aluno.matricula !== matricula
      )

    )

  }


  /* =========================
     PAGINAÇÃO
  ========================= */

  function voltarPagina() {

    if (paginaAtual > 1) {

      setPaginaAtual(
        paginaAtual - 1
      )

    }

  }


  function avancarPagina() {

    if (
      paginaAtual < totalPaginas
    ) {

      setPaginaAtual(
        paginaAtual + 1
      )

    }

  }


  return (

    <DashboardLayout>

      <div className="alunos-page">


        {/* =========================
            CABEÇALHO
        ========================= */}

        <div className="alunos-header">

          <div className="alunos-header-text">

            <div className="alunos-avatar">
              👨‍💻
            </div>


            <div>

              <h1>
                Olá, Marcos!
              </h1>

              <p>
                Alunos
              </p>

            </div>

          </div>

        </div>


        {/* =========================
            BUSCA
        ========================= */}

        <div className="student-search">

          <input
            type="text"
            placeholder="Buscar aluno..."
            value={busca}
            onChange={(e) =>
              alterarFiltro(
                setBusca,
                e.target.value
              )
            }
          />

        </div>


        {/* =========================
            FILTROS
        ========================= */}

        <div className="student-filters">


          <select
            value={turmaFiltro}
            onChange={(e) =>
              alterarFiltro(
                setTurmaFiltro,
                e.target.value
              )
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
            value={riscoFiltro}
            onChange={(e) =>
              alterarFiltro(
                setRiscoFiltro,
                e.target.value
              )
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
            value={frequenciaFiltro}
            onChange={(e) =>
              alterarFiltro(
                setFrequenciaFiltro,
                e.target.value
              )
            }
          >

            <option value="">
              Frequência
            </option>

            <option value="alta">
              Alta
            </option>

            <option value="media">
              Média
            </option>

            <option value="baixa">
              Baixa
            </option>

          </select>


        </div>


        {/* =========================
            FORMULÁRIO DE EDIÇÃO
        ========================= */}

        {alunoEditando && (

          <div className="edit-form">

            <h2>
              Editar aluno
            </h2>


            <input
              type="text"
              value={alunoEditando.nome}
              onChange={(e) =>
                setAlunoEditando({
                  ...alunoEditando,
                  nome: e.target.value
                })
              }
            />


            <input
              type="text"
              value={alunoEditando.turma}
              onChange={(e) =>
                setAlunoEditando({
                  ...alunoEditando,
                  turma: e.target.value
                })
              }
            />


            <input
              type="number"
              value={alunoEditando.frequencia}
              onChange={(e) =>
                setAlunoEditando({
                  ...alunoEditando,
                  frequencia:
                    Number(e.target.value)
                })
              }
            />


            <select
              value={alunoEditando.risco}
              onChange={(e) =>
                setAlunoEditando({
                  ...alunoEditando,
                  risco: e.target.value
                })
              }
            >

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


            <button
              className="save-button"
              onClick={salvarEdicao}
            >
              Salvar
            </button>


            <button
              className="cancel-button"
              onClick={() =>
                setAlunoEditando(null)
              }
            >
              Cancelar
            </button>

          </div>

        )}


        {/* =========================
            TABELA
        ========================= */}

        <div className="students-table-container">

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

                <th>
                  Ações
                </th>

              </tr>

            </thead>


            <tbody>

              {alunosPagina.map((aluno) => (

                <tr
                  key={aluno.matricula}
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

                    <div className="risk-cell">

                      <span
                        className={
                          `risk-dot ${aluno.risco.toLowerCase()}`
                        }
                      ></span>

                      {aluno.risco}

                    </div>

                  </td>


                  <td>

                    <div className="student-actions">

                      <button
                        className="edit-button"
                        onClick={() =>
                          editarAluno(aluno)
                        }
                      >
                        Editar
                      </button>


                      <button
                        className="delete-button"
                        onClick={() =>
                          excluirAluno(
                            aluno.matricula
                          )
                        }
                      >
                        Excluir
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* =========================
            PAGINAÇÃO
        ========================= */}

        <div className="students-pagination">

          <span>

            {alunosFiltrados.length === 0

              ? "0 - 0 de 0"

              : `${indiceInicial + 1} - ${Math.min(
                  indiceInicial +
                    alunosPorPagina,
                  alunosFiltrados.length
                )} de ${
                  alunosFiltrados.length
                }`

            }

          </span>


          <div className="pagination-buttons">

            <button
              onClick={voltarPagina}
              disabled={paginaAtual === 1}
            >
              ‹
            </button>


            <span className="current-page">
              {paginaAtual}
            </span>


            <span>
              de
            </span>


            <span>
              {totalPaginas}
            </span>


            <button
              onClick={avancarPagina}
              disabled={
                paginaAtual ===
                totalPaginas
              }
            >
              ›
            </button>

          </div>

        </div>


      </div>

    </DashboardLayout>

  )

}

export default Alunos