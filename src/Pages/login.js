import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../Assets/imagens/Group 8.png";

export default function Login() {

const [post, setPost] = useState(undefined);

    const [infoLogin, setInfoLogin] = useState({
        email: "",
        password: ""
    });

    const urlLogin = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

    function handleLogin(e) {
        setInfoLogin({
            ...infoLogin,
            [e.target.name]: e.target.value,
        })
    }

    function fazerLogin() {
        if (infoLogin.email.length != 0 && infoLogin.password.length != 0){
            axios.post(urlLogin,infoLogin).then((response)=> console.log(response.data)).catch(alert("Deu ruim"));
            console.log("salve")
        }
      }



    return (
        <>
            <Corpo>
                <Logo>
                    <img src={logo}></img>
                </Logo>
                <InputEmail name="email" onChange={handleLogin} />
                <InputSenha type="password" name="password" onChange={handleLogin} />
                <BotaoEntrar onClick={fazerLogin}>Entrar</BotaoEntrar>
                <Link to="/cadastro">
                    <IrCadastro>Não tem uma conta? Cadastre-se!</IrCadastro>
                </Link>

            </Corpo>
        </>
    )
}

const Corpo = styled.div`
background-color: white;
width:375px;
height:667px;
box-sizing:border-box;
position:relative;
justify-content:center;
display:flex;
`
const Logo = styled.div`
position:absolute;
top:68px;
`

const InputEmail = styled.input.attrs({
    placeholder: "email",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 303px;
            height: 45px;
            position:absolute;
            top:279px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            ::placeholder{
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 19.976px;
                line-height: 25px;
                color: #DBDBDB;
            }       
    }
  `

const InputSenha = styled.input.attrs({
    placeholder: "senha",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 303px;
            height: 45px;
            position:absolute;
            top: 330px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            ::placeholder{
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 19.976px;
                line-height: 25px;
                color: #DBDBDB;
            }         
    }
  `

const BotaoEntrar = styled.button`
    all:unset;
    display: flex;
    justify-content:center;
    align-items:center;
    position: absolute;
    width: 303px;
    height: 45px;
    top: 381px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;

    color: #FFFFFF;

  `

const IrCadastro = styled.div`
all:unset;
   
    position: absolute;
    width: 232px;
    height: 17px;
    top: 451px;
    left:74px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;

    color: #52B6FF;


  `