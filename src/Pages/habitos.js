import React, { useContext, useEffect } from "react";
import Context from "./Context";
import axios from "axios";
import styled from "styled-components";


export default function Habitos() {
    const [info, setInfo] = useContext(Context);
    let habitos = [];
    console.log(info);
    const urlHabito = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
    useEffect(() => {
        const promise = axios.get(urlHabito, {
            headers: {
                'Authorization': `Bearer ${info.token}`
            }
        });
        promise.then((res) => {
            habitos = res.data;
        })
        promise.catch((err) => { })
    }, [])
    if (habitos.length === 0) {
        return (
            <>
                <Corpo>
                    <Header>TrackIt
                        <img src={info.image} />
                    </Header>
                    <H1>Meus Hábitos
                        <p>+</p>
                    </H1>
                    <Conteudo>
                        <CriandoHabito>
                            <InputHabito/>
                            <Dias>
                                <Dia>D</Dia>
                                <Dia>S</Dia>
                                <Dia>T</Dia>
                                <Dia>Q</Dia>
                                <Dia>Q</Dia>
                                <Dia>S</Dia>
                                <Dia>S</Dia>
                            </Dias>
                        </CriandoHabito>
                        <H2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</H2>
                    </Conteudo>
                </Corpo>
            </>
        )
    }
    return (
        <>
        </>
    )
}

const Corpo = styled.div`
background-color:#F2F2F2;
width:375px;
height:667px;
box-sizing:border-box;
position:relative;
`

const Header = styled.div`
box-sizing:border-box;
padding-top:10px;
padding-left:18px;
position: absolute;
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
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    margin-right:4px;
    color: #DBDBDB;
  `