import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Alunos.css"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

function Alunos() {


  const [alunos, setAlunos] = useState([

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


  const [alunoSelecionado, setAlunoSelecionado] =
    useState(null)


  function abrirAluno(aluno) {

    setAlunoSelecionado(aluno)

  }


  function fecharAluno() {

    setAlunoSelecionado(null)

  }


  return (

    <DashboardLayout>


      <div className="alunos-page">


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


        <input
          className="search-aluno"
          type="text"
          placeholder="Buscar aluno..."
        />


        <div className="filters">


          <select>

            <option>
              Turma
            </option>

            <option>
              1A
            </option>

            <option>
              2B
            </option>

            <option>
              3A
            </option>

          </select>


          <select>

            <option>
              Nível de risco
            </option>

            <option>
              Baixo
            </option>

            <option>
              Médio
            </option>

            <option>
              Alto
            </option>

          </select>


          <select>

            <option>
              Frequência
            </option>

            <option>
              Acima de 80%
            </option>

            <option>
              Entre 70% e 80%
            </option>

            <option>
              Abaixo de 70%
            </option>

          </select>


        </div>


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

            {alunos.map((aluno) => (

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

          </tbody>


        </table>


        <div className="pagination">

          <span>
            1 - 6 de 350
          </span>

          <button>
            ‹
          </button>

          <button className="current-page">
            1
          </button>

          <span>
            de 70
          </span>

          <button>
            ›
          </button>

        </div>


      </div>


      {/* =========================
          POP-UP DO ALUNO
      ========================= */}

      {alunoSelecionado && (

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


              <div className="frequency-summary">

                <strong>
                  {alunoSelecionado.frequencia}%
                </strong>

                <span>
                  Frequência geral
                </span>

              </div>


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


    </DashboardLayout>

  )

}


export default Alunos