import DashboardLayout from "../layouts/DashboardLayout"
import { useEffect, useState } from "react"
import api from "../services/api"
import { getUsuario, getToken } from "../services/auth"

function Dashboard() {

  const [dados, setDados] = useState(null)

  const [usuario, setUsuario] = useState(null)

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatarUsuario") || ""
  )

  const [carregando, setCarregando] = useState(true)

  const [erro, setErro] = useState("")


  const alertas = [

    {
      aluno: "João Silva",
      percentual: "87%",
      nivel: "alto"
    },

    {
      aluno: "Marcos Heitor",
      percentual: "82%",
      nivel: "alto"
    },

    {
      aluno: "João Silva",
      percentual: "65%",
      nivel: "medio"
    }

  ]


  const riscoPorTurma = [

    {
      turma: "3A",
      percentual: 70
    },

    {
      turma: "2B",
      percentual: 50
    },

    {
      turma: "1A",
      percentual: 30
    }

  ]


  useEffect(() => {

    setUsuario(getUsuario())

    setAvatar(
      localStorage.getItem("avatarUsuario") || ""
    )

  }, [])


  useEffect(() => {

    const token = getToken()


    if (token === "token-demo") {

      setDados({

        totalAlunos: 350,

        alunosRisco: 20,

        alunosAltoRisco: 7,

        taxaFrequenciaGeral: 95,

        alertasAbertos: 5

      })

      setCarregando(false)

      return

    }


    api.get("/dashboard/resumo")

      .then(response => {

        setDados(response.data)

        setCarregando(false)

      })

      .catch(error => {

        console.log(error)

        setErro(
          "Não foi possível carregar os dados do dashboard."
        )

        setCarregando(false)

      })

  }, [])


  function atualizarAvatar() {

    setAvatar(
      localStorage.getItem("avatarUsuario") || ""
    )

  }


  if (carregando) {

    return (

      <DashboardLayout>

        <p>
          Carregando dashboard...
        </p>

      </DashboardLayout>

    )

  }


  if (erro) {

    return (

      <DashboardLayout>

        <div className="dashboard-error">

          ⚠️ {erro}

        </div>

      </DashboardLayout>

    )

  }


  return (

    <DashboardLayout>

      <div className="dashboard-page">


        {/* =========================
            CABEÇALHO
        ========================= */}

        <div className="dashboard-header">


          <div>

            <h1>
              E aí, {usuario?.nome || "Visitante"}!
            </h1>

            <p>
              Acompanhamento - Visão Geral
            </p>

          </div>


          {/* USUÁRIO NO TOPO */}

          <div
            className="dashboard-user"
            onClick={atualizarAvatar}
            title="Foto do usuário"
          >

            <div className="dashboard-avatar">

              {avatar ? (

                <img
                  src={avatar}
                  alt="Foto do usuário"
                />

              ) : (

                "👨‍💻"

              )}

            </div>


            <div className="dashboard-user-info">

              <strong>
                {usuario?.nome || "Visitante"}
              </strong>

              <span>
                Monitor
              </span>

            </div>

          </div>


        </div>


        {/* =========================
            CARDS
        ========================= */}

        <div className="dashboard-cards">


          <div className="dashboard-card">

            <strong>
              {dados?.totalAlunos}
            </strong>

            <span>
              Alunos
            </span>

          </div>


          <div className="dashboard-card attention">

            <strong>
              {dados?.alunosRisco}
            </strong>

            <span>
              Em atenção
            </span>

          </div>


          <div className="dashboard-card danger">

            <strong>
              {dados?.alunosAltoRisco}
            </strong>

            <span>
              Alto Risco
            </span>

          </div>


          <div className="dashboard-card success">

            <strong>
              {dados?.taxaFrequenciaGeral}%
            </strong>

            <span>
              Frequência Geral
            </span>

          </div>


        </div>


        {/* =========================
            GRÁFICO
        ========================= */}

        <div className="risk-chart-card">


          <h2>
            Evolução do risco de evasão
          </h2>


          <div className="risk-chart">

            <svg
              viewBox="0 0 700 220"
              preserveAspectRatio="none"
            >

              <polyline
                points="30,170 170,125 300,120 430,55 570,35"
                fill="none"
                stroke="#ffc66d"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              <circle
                cx="30"
                cy="170"
                r="5"
                fill="#ffc66d"
              />

              <circle
                cx="170"
                cy="125"
                r="5"
                fill="#ffc66d"
              />

              <circle
                cx="300"
                cy="120"
                r="5"
                fill="#ffc66d"
              />

              <circle
                cx="430"
                cy="55"
                r="5"
                fill="#ffc66d"
              />

              <circle
                cx="570"
                cy="35"
                r="5"
                fill="#ffc66d"
              />

            </svg>

          </div>


        </div>


        {/* =========================
            PARTE INFERIOR
        ========================= */}

        <div className="dashboard-bottom">


          {/* ALUNOS EM ATENÇÃO */}

          <div className="attention-card">


            <h2>
              Alunos que precisam de atenção
            </h2>


            <div className="attention-list">


              {alertas.map((alerta, index) => (

                <div
                  className="attention-item"
                  key={index}
                >


                  <div className="attention-student">


                    <span
                      className={
                        `risk-dot ${alerta.nivel}`
                      }
                    ></span>


                    <span>
                      {alerta.aluno}
                    </span>


                  </div>


                  <strong>
                    {alerta.percentual}
                  </strong>


                </div>

              ))}


            </div>


          </div>


          {/* RISCO POR TURMA */}

          <div className="class-risk-card">


            <h2>
              Risco por turma
            </h2>


            <div className="class-risk-list">


              {riscoPorTurma.map((item, index) => (

                <div
                  className="class-risk-item"
                  key={index}
                >


                  <span>
                    {item.turma}
                  </span>


                  <div className="risk-bar">


                    <div
                      className="risk-bar-fill"
                      style={{
                        width:
                          `${item.percentual}%`
                      }}
                    ></div>


                  </div>


                </div>

              ))}


            </div>


          </div>


        </div>


      </div>

    </DashboardLayout>

  )

}

export default Dashboard