import React, { useContext, useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";



export default function Habitos() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("none");
    const [info, setInfo] = useContext(Context);
    const [habitos, setHabitos] = useState([
        {
            id: "",
            name: "",
            days: []
        }]);
    const urlHabito = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const semana = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [infoHabito, setInfoHabito] = useState({
        name: "",
        days: []
    })

    function escolherDia(dia) {
        const novoDia = {
            ...infoHabito,
            days: [...infoHabito.days, dia.target.id]
        };
        console.log(novoDia);
        setInfoHabito(novoDia);
    }

    function removerDia(dia) {
        const arr = [];
        for (let i = 0; i < infoHabito.days.length; i++) {
            if (infoHabito.days[i] != dia.target.id) {
                arr.push(infoHabito.days[i])
            }
        }
        const semDiaTirado = {
            ...infoHabito,
            days: arr
        }
        setInfoHabito(semDiaTirado);
    }

    function handleInput(e) {
        setInfoHabito({
            ...infoHabito,
            name: e.target.value
        })
    }

    function criarHabito() {

        const urlCriar = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.post(urlCriar, infoHabito, {
            headers: {
                'Authorization': `Bearer ${info.token}`
            }
        });
        promise.then(() => { setStatus("none") });

        const promise2 = axios.get(urlHabito, {
            headers: {
                'Authorization': `Bearer ${info.token}`
            }
        });
        promise2.then((res) => { setHabitos(res.data) })
    }

    useEffect(() => {
        const promise = axios.get(urlHabito, {
            headers: {
                'Authorization': `Bearer ${info.token}`
            }
        });

        promise.then((res) => {
            setHabitos(res.data);
        });

        promise.catch((err) => { })
    }, []);



    if (habitos.length === 0) {
        return (
            <>
                <Corpo>
                    <Header>TrackIt
                        <img src={info.image} />
                    </Header>
                    <H1><h1>Meus Hábitos</h1>
                        <p onClick={() => { setStatus("column") }}>+</p>
                    </H1>
                    <Conteudo>
                        <CriandoHabito display={status}>
                            <InputHabito onChange={handleInput} />
                            <Dias>
                                {semana.map((dia, index) => {
                                    if (infoHabito.days.includes(`${index}`)) {
                                        return (
                                            <Dia onClick={removerDia} cor1="#DBDBDB" cor2="#FFFFFF" key={index} id={index}>{dia}</Dia>
                                        )
                                    }
                                    return (
                                        <Dia onClick={escolherDia} cor1="#FFFFFF" cor2="#DBDBDB" key={index} id={index}>{dia}</Dia>
                                    )
                                }
                                )}
                            </Dias>
                            <Cancelar onClick={() => { setStatus("none") }}>Cancelar</Cancelar>
                            <Salvar onClick={criarHabito}>Salvar</Salvar>
                        </CriandoHabito>
                        <H2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</H2>
                    </Conteudo>
                    <Footer>
                        <h1>Hábitos</h1>
                        <h2>Histórico</h2>
                        <div> <CircularProgressbar
                            value={80}
                            text="Hoje"
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent",
                                fontFamily: "Lexend Deca"
                            })}
                        />
                        </div>

                    </Footer>
                </Corpo>
            </>
        )
    }
    return (
        <>
            <Corpo>
                <Header>TrackIt
                    <img src={info.image} />
                </Header>
                <H1>Meus Hábitos
                    <p onClick={() => { setStatus("column") }}>+</p>
                </H1>
                <Conteudo>
                    <CriandoHabito display={status}>
                        <InputHabito onChange={handleInput} />
                        <Dias>
                            {semana.map((dia, index) => {
                                if (infoHabito.days.includes(`${index}`)) {
                                    return (
                                        <Dia onClick={removerDia} cor1="#DBDBDB" cor2="#FFFFFF" key={index} id={index}>{dia}</Dia>
                                    )
                                }
                                return (
                                    <Dia onClick={escolherDia} cor1="#FFFFFF" cor2="#DBDBDB" key={index} id={index}>{dia}</Dia>
                                )
                            }
                            )}
                        </Dias>
                        <Cancelar onClick={() => { setStatus("none"); setInfoHabito({ ...infoHabito, days: [] }) }}>Cancelar</Cancelar>
                        <Salvar onClick={criarHabito}>Salvar</Salvar>
                    </CriandoHabito>

                    {habitos.map((habito, index) => {
                        return (<CardHabito key={index}>
                            <h1>{habito.name}</h1>

                            <Posicionar>
                                {semana.map((dia, index) => {
                                    if (habito.days.includes(index)) {
                                        return (<Dia cor1="#DBDBDB" cor2="#FFFFFF" key={index} id={index}>{dia}</Dia>)
                                    }
                                    return (<Dia cor1="#FFFFFF" cor2="#DBDBDB" key={index} id={index}>{dia}</Dia>)
                                })}
                            </Posicionar>
                        </CardHabito>)
                    })}

                </Conteudo>
                <Footer>
                    <h1>Hábitos</h1>
                    <h2>Histórico</h2>
                    <div> <CircularProgressbar
                        value={80}
                        text="Hoje"
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent",
                            fontFamily: "Lexend Deca"
                        })}
                    />
                    </div>

                </Footer>
            </Corpo>
        </>
    )
}

const Posicionar = styled.div`
margin-top:10px;
display:flex;
box-sizing:border-box;
`

const CardHabito = styled.div`
box-sizing:border-box;
padding-top:13px;
padding-left:14px;
height: 91px;
width: 340px;
border-radius: 5px;
margin-bottom:10px;
background: #FFFFFF;
border-radius: 5px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: #666666;
h1{
    all:unset;
}
`

const Corpo = styled.div`
background-color:#F2F2F2;
width:375px;
height:667px;
position:relative;
overflow:auto;
padding-bottom:70px;
`

const Footer = styled.div`
position: fixed;
box-sizing:border-box;
width: 375px;
height: 70px;
left: 0px;
top: 597px;
background: #FFFFFF;
h1{
    all:unset;
    position:absolute;
    top:22px;
    left:36px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52B6FF;
}
h2{
    all:unset;
    position:absolute;
    top:22px;
    left:265px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52B6FF;

}
div{
    position: absolute;
    left: 142px;
    bottom: 10px;
    width:69px;
    height:79px;
}
`

const Header = styled.div`
box-sizing:border-box;
z-index:4;
padding-top:10px;
padding-left:18px;
position: fixed;
width: 375px;
height: 70px;
left: 0px;
top: 0px;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
font-family: 'Playball';
font-style: normal;
font-weight: 400;
font-size: 38.982px;
line-height: 49px;
color: #FFFFFF;
img{
    position: absolute;
    width: 51px;
    height: 51px;
    left: 306px;
    top: 9px;
    border-radius: 98.5px;
}

`

const H1 = styled.div`
position: absolute;
display:flex;
align-items:center;
justify-content:center;
left: 17px;
top: 92px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;
margin-bottom:20px;
cursor:default;

p{
    display:flex;
    align-items:center;
    justify-content:center;
    box-sizing:border-box;
    margin-left:152px;  
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 27px;
    color: #FFFFFF;
    cursor:pointer;
}
h1{
    all:unset;
    width: 148px;
    height: 29px;
}
`
const Conteudo = styled.div`
position:absolute;
box-sizing:border-box;
top:155px;
left:18px;
`

const H2 = styled.div`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;

color: #666666;
`

const CriandoHabito = styled.div`
display:${props => props.display};
position:relative;
width: 340px;
height: 180px;
margin-bottom:29px;

background: #FFFFFF;
border-radius: 5px;
`

const InputHabito = styled.input.attrs({
    placeholder: "nome do hábito",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 303px;
            height: 45px;
            position:absolute;
            top:18px;
            left:19px;
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

const Dias = styled.div`
    display:flex;
    position:absolute;
    top:71px;
    left:19px;
  `

const Dia = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 30px;
    height: 30px;
    background: ${props => props.cor1};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    margin-right:4px;
    color: ${props => props.cor2};
    cursor: default;
  `

const Cancelar = styled.div`
  position: absolute;
    left: 148px;
    top: 137px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
    cursor:default;
  `
const Salvar = styled.div`
    position: absolute;
    display:flex;
    align-items:center;
    justify-content:center;
    width: 84px;
    height: 35px;
    left: 240px;
    top: 130px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    color: #FFFFFF;
    cursor:default;
  `