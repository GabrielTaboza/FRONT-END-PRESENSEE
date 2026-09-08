import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../styles/Login.css"

import imagemLogin from "../assets/login.jpg"


function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState("")


  async function handleLogin(e) {

    e.preventDefault()

    if (email === "" || senha === "") {

      setErro("Preencha todos os campos")

      return

    }


    try {

      const response = await api.post("/auth/login", {

        email: email,
        senha: senha

      })


      localStorage.setItem(
        "token",
        response.data.token
      )


      navigate("/dashboard")

    }


    catch (error) {

      console.log(error)

      setErro("Email ou senha inválidos")

    }

  }


return (

  <div className="login-container">


    <img
      className="login-background"
      src={imagemLogin}
      alt="PresenSee"
    />


    <div className="login-card">


      <h1>
        Login
      </h1>


      <form onSubmit={handleLogin}>


        <label>
          Email
        </label>


        <input
          className="login-input"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <label>
          Senha
        </label>


        <input
          className="login-input"
          type={mostrarSenha ? "text" : "password"}
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />


        <p
          className="show-password"
          onClick={() => setMostrarSenha(!mostrarSenha)}
        >

          {mostrarSenha
            ? "Ocultar senha"
            : "Mostrar senha"
          }

        </p>


        {
          erro && (

            <p className="error-message">
              {erro}
            </p>

          )
        }


        <button
          className="login-button"
          type="submit"
        >

          Entrar

         </button>

      <button
  type="button"
  className="create-account"
  onClick={() => {
    localStorage.setItem("token", "token-demo")

    localStorage.setItem(
      "usuario",
      JSON.stringify({
        nome: "Visitante",
        perfil: "Demonstração"
      })
    )

    navigate("/dashboard")
  }}
>
  Entrar como visitante
</button>




        <p className="login-info-text">

          Contas disponibilizadas pela
          administração escolar.

        </p>


      </form>


    </div>


  </div>

)

}


export default Login