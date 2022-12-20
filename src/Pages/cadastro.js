import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../Assets/imagens/Group 8.png";
import { ThreeDots } from "react-loader-spinner";


export default function Cadastro() {

    const [estado, setEstado] = useState("padrao");
    const [infoCadastro, setInfoCadastro] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });
    const urlCadastro = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const navigate = useNavigate();

    function handleForm(e) {
        setInfoCadastro({
            ...infoCadastro,
            [e.target.name]: e.target.value,
        })
    }

    function cadastrar() {
        if (infoCadastro.email.length != 0 && infoCadastro.name.length != 0 && infoCadastro.image.length != 0 && infoCadastro.password.length != 0) {
            setEstado("Loading")
            axios.post(urlCadastro, infoCadastro).then(
                ()=> {navigate("/")}
            ).catch(
                ()=>{
                    alert("Problemas no cadastro verifique suas informações!")
                    setEstado("padrao");
                }
            )
        }

    }
    let a = "blue";

    if (estado === "padrao") {
        return (
            <>
                <Corpo>

                    <Logo>
                        <img src={logo}></img>
                    </Logo>

                    <form id="formCadastro">
                        <InputEmail  data-test="email-input"  type="email" name="email" onChange={handleForm} />
                        <InputSenha  data-test="password-input"  type="password" name="password" onChange={handleForm} />
                        <InputNome   data-test="user-name-input" type="text" name="name" onChange={handleForm} />
                        <InputFoto   data-test="user-image-input"  type="url" name="image" onChange={handleForm} />
                    </form>

                    <BotaoCadastrar data-test="signup-btn" onClick={cadastrar}>Cadastrar</BotaoCadastrar>

                    <Link to="/">
                        <IrLogin data-test="login-link">Já tem uma conta? Faça login!</IrLogin>
                    </Link>

                </Corpo>
            </>
        )
    }

    return (
        <>
            <Corpo>

                <Logo>
                    <img src={logo}></img>
                </Logo>

                <form id="formCadastro">
                    <InputEmail disabled ={true} type="email" name="email" onChange={handleForm} />
                    <InputSenha disabled={true} type="password" name="password" onChange={handleForm} />
                    <InputNome disabled= {true} type="text" name="name" onChange={handleForm} />
                    <InputFoto disabled= {true} type="url" name="image" onChange={handleForm} />
                </form>

                <BotaoCadastrar disabled = "true"><ThreeDots width="50px" color = "white"/></BotaoCadastrar>

                <Link to="/">
                    <IrLogin>Já tem uma conta? Faça login!</IrLogin>
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
            left:36px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: black;
            ::placeholder{
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 19.976px;
                line-height: 25px;
                color: #DBDBDB;
            }    
            :disabled{
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                color: #AFAFAF;
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
            left:36px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: black;
            ::placeholder{
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 19.976px;
                line-height: 25px;
                color: #DBDBDB;
            } 
            :disabled{
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                color: #AFAFAF;
            }          
    }
  `


const InputNome = styled.input.attrs({
    placeholder: "nome",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 303px;
            height: 45px;
            position:absolute;
            top:381px;
            left:36px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: black;
            ::placeholder{
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 19.976px;
                line-height: 25px;
                color: #DBDBDB;
            }   
            :disabled{
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                color: #AFAFAF;
            }      
    }
  `


const InputFoto = styled.input.attrs({
    placeholder: "foto",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 303px;
            height: 45px;
            position:absolute;
            top:432px;
            left:36px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: black;
            ::placeholder{
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 19.976px;
                line-height: 25px;
                color: #DBDBDB;
            }   
            :disabled{
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                color: #AFAFAF;
            }      
    }
  `

const BotaoCadastrar = styled.button`
all:unset;
display: flex;
justify-content:center;
align-items:center;
position: absolute;
width: 303px;
height: 45px;
top: 483px;
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

const IrLogin = styled.div`
all:unset;
   
    position: absolute;
    width: 232px;
    height: 17px;
    top: 553px;
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