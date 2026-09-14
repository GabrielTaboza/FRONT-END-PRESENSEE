import { NavLink, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { getUsuario, logout } from "../services/auth"

function Sidebar() {

  const navigate = useNavigate()
  const usuario = getUsuario()

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatarUsuario") || ""
  )

  const inputAvatar = useRef(null)

  function handleLogout() {

    logout()

    navigate("/login")

  }

  function escolherAvatar(e) {

    const arquivo = e.target.files[0]

    if (!arquivo) {
      return
    }

    const leitor = new FileReader()

    leitor.onload = () => {

      const imagem = leitor.result

      setAvatar(imagem)

      localStorage.setItem(
        "avatarUsuario",
        imagem
      )

    }

    leitor.readAsDataURL(arquivo)

  }


  return (

    <aside className="sidebar">


      {/* LOGO */}

      <div className="sidebar-logo">

        <h2>
          Presen<span>See</span>
        </h2>

      </div>


      {/* MENU */}

      <nav className="sidebar-menu">

        <NavLink to="/dashboard">
          <span>⌂</span>
          Home
        </NavLink>


        <NavLink to="/alunos">
          <span>♙</span>
          Alunos
        </NavLink>


        <NavLink to="/alertas">
          <span>⚑</span>
          Alertas
        </NavLink>


        <NavLink to="/frequencia">
          <span>◉</span>
          Diário do monitor
        </NavLink>


        <NavLink to="/novo-aluno">
          <span>✚</span>
          Intervenção
        </NavLink>


        <NavLink to="/turmas">
          <span>♧</span>
          Turma
        </NavLink>


        <NavLink to="/relatorios">
          <span>▣</span>
          Relatório
        </NavLink>

      </nav>


      {/* USUÁRIO */}

      <div className="sidebar-user">

        <div
          className="sidebar-avatar"
          onClick={() => inputAvatar.current.click()}
          title="Alterar foto"
        >

          {avatar ? (
            <img
              src={avatar}
              alt="Foto do usuário"
            />
          ) : (
            "👨‍💻"
          )}

          <span className="avatar-camera">
            📷
          </span>

          <input
            ref={inputAvatar}
            type="file"
            accept="image/*"
            onChange={escolherAvatar}
            style={{ display: "none" }}
          />

        </div>


        <div>

          <strong>
            {usuario?.nome || "Marcos A."}
          </strong>

          <span>
            Monitor
          </span>

        </div>

      </div>


      {/* SAIR */}

      <button
        className="logout-button"
        onClick={handleLogout}
      >

        ↪

        <span>
          Encerrar Sessão
        </span>

      </button>


    </aside>

  )

}

export default Sidebar