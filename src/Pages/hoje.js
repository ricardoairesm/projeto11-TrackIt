import React, { useContext, useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { TrashOutline } from "react-ionicons";
import { CheckmarkOutline } from 'react-ionicons'





export default function Hoje() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("none");
    const [info, setInfo] = useContext(Context);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const hoje = today.getDate();
    const mes = today.getMonth();
    const diaSemana = today.getDay();
    const semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const [habitos, setHabitos] = useState([]);
    const urlHoje = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";


    useEffect(() => {
        const promise = axios.get(urlHoje, {
            headers: {
                'Authorization': `Bearer ${info.token}`
            }
        });

        promise.then((res) => {
            setHabitos(res.data);
        });

        promise.catch((err) => { })
    }, []);

    function marcarHabito(e){
        console.log(e.target)
        
        const urlMarca = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${e.target.id}/check`;
        const promise = axios.post(urlMarca,{},{
            headers: {
                'Authorization': `Bearer ${info.token}`
            }
        });
        promise.then(()=>{
            const promise2 = axios.get(urlHoje, {
                headers: {
                    'Authorization': `Bearer ${info.token}`
                }
            });
    
            promise2.then((res) => {
                setHabitos(res.data);
            });
        }) ;

    }

    function desmarcarHabito(e){
        console.log(e.target)
        
        const urlDesmarca = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${e.target.id}/uncheck`;
        const promise = axios.post(urlDesmarca,{},{
            headers: {
                'Authorization': `Bearer ${info.token}`
            }
        });
        promise.then(()=>{
            const promise2 = axios.get(urlHoje, {
                headers: {
                    'Authorization': `Bearer ${info.token}`
                }
            });
    
            promise2.then((res) => {
                setHabitos(res.data);
            });
        }) ;

    }


    return (

        <>
            <Corpo>
                <Header>TrackIt
                    <img src={info.image} />
                </Header>
                <H1>{`${semana[diaSemana]}, ${hoje}/${mes + 1}`}</H1>
                <Conteudo>
                    {habitos.map((habito,index) => {
                        if (habito.done === true) {
                            return (
                                <CardHabito key = {index}>
                                    <div>
                                        <h1>{habito.name}</h1>
                                        <br /><br />
                                        <h2>{`Sequência atual: ${habito.currentSequence}`}<br/>
                                        {`Seu recorde: ${habito.highestSequence}`}</h2>
                                    </div>
                                    <Check cor = "#8FC549" id={habito.id} onClick = {desmarcarHabito}><CheckmarkOutline color={'#ffffff'} height="28px" width="35px" fontWeight="400" /></Check>
                                </CardHabito>
                            )
                        }
                        return (
                            <CardHabito key = {index}>
                                <div>
                                    <h1>{habito.name}</h1>
                                    <br /><br />
                                    <h2>{`Sequência atual: ${habito.currentSequence}`}<br/>
                                        {`Seu recorde: ${habito.highestSequence}`}</h2>
                                </div>
                                <Check cor = "#EBEBEB" id = {habito.id} onClick={marcarHabito}><CheckmarkOutline color={'#ffffff'} height="28px" width="35px" fontWeight="400" /></Check>
                            </CardHabito>
                        )
                    })}
                </Conteudo>
                <Footer>
                    <h1>Hábitos</h1>
                    <h2>Histórico</h2>
                    <div onClick={() => { navigate("/hoje") }}> <CircularProgressbar
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

const Check = styled.div`
display:flex;
justify-content:center;
align-items:center;
box-sizing: border-box;
width: 69px;
height: 69px;
background: ${props=>props.cor};
border: 1px solid #E7E7E7;
border-radius: 5px;
`

const CardHabito = styled.div`
display:flex;
justify-content:space-between;
box-sizing:border-box;
padding-left:15px;
padding-top:13px;
padding-right:15px;
width: 340px;
height: 94px;
left: 18px;
top: 177px;
background: #FFFFFF;
border-radius: 5px;
margin-bottom:10px;
h1{
    all:unset;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    color: #666666;
    margin-bottom:7px;
}
h2{
    all:unset;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
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
margin-bottom:50px;
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