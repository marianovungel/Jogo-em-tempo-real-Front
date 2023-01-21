import React, { useEffect, useState } from 'react'
import './index.css'

export default function Index({ socket}) {

    const [valorUser, setValorUser] = useState(10)
    const [valorComputador, setValorComputador] = useState(10)
    const [result, setResult] = useState("Resultado...")
    const [username, setUsername] = useState("")
    const [computerPoint, setComputerPoint] = useState(0)
    const [userPoint, setUserPoint] = useState(0)
    const [use, setUse] = useState(null)
    const [sala, setSala] = useState("")
    const [show, setShow] = useState(false)


    useEffect(()=>{
        socket.on("recive", (data)=>{
            setValorComputador(data.valor)
        })
    }, [socket])



    const pedraUser = async()=>{
        setValorUser(1)
        const sendValor = {
            valor: 1,
            name: use,
            room: sala,
            your: valorComputador
        }
        const userVa = await socket.emit("send", sendValor);

    }
    const papelUser = async ()=>{
        setValorUser(2)

        const sendValor = {
            valor: 2,
            name: use,
            room: sala,
            your: valorComputador
        }
        const userVa = await socket.emit("send", sendValor);
    }
    const tesouraUser = async ()=>{
        setValorUser(3)

        const sendValor = {
            valor: 3,
            name: use,
            room: sala,
            your: valorComputador
        }
        const userVa = await socket.emit("send", sendValor);
    }
    const novojogo = ()=>{
        setValorUser(0)
        setValorComputador(0)
        setComputerPoint(0)
        setUserPoint(0)
        return setResult("Resultados...")
    }

    const addUser = ()=>{
        socket.emit("join_room", sala);
        setUse(username)
    }
    
    const verificar = ()=>{
        setShow(true)

        if(valorUser===1){
            if(valorComputador===1){
                setComputerPoint(computerPoint+0.5)
                setUserPoint(userPoint+0.5)
                return setResult("Empate!")
            }
            if(valorComputador===2){
                setComputerPoint(computerPoint+1)
                return setResult("Você perdeu!")
            }
            if(valorComputador===3){
                setUserPoint(userPoint+1)
                return setResult("Você ganhou!")
            }

            novojogo()
        }

        if(valorUser===2){
            if(valorComputador===1){
                setUserPoint(userPoint+1)
                return setResult("Você ganhou!")
            }
            if(valorComputador===2){
                setComputerPoint(computerPoint+0.5)
                setUserPoint(userPoint+0.5)
                return setResult("Empate!")
            }
            if(valorComputador===3){
                setComputerPoint(computerPoint+1)
                return setResult("Você perdeu!")
            }

            novojogo()
        }

        if(valorUser===3){
            if(valorComputador===1){
                setComputerPoint(computerPoint+1)
                return setResult("Você perdeu!")
                
            }
            if(valorComputador===2){
                setUserPoint(userPoint+1)
                return setResult("Você ganhou!")
            }
            if(valorComputador===3){
                setComputerPoint(computerPoint+0.5)
                setUserPoint(userPoint+0.5)
                return setResult("Empate!")
            }

            novojogo()
        }

        novojogo()
    }



  return (
    <div className='fullContent'>
        <header className="headerClass">
            <div className="setMenu">
                <button className='jogar' onClick={novojogo}>Jogar</button>
                <i className="fa-solid fa-screwdriver-wrench setSize"></i>
            </div>
        </header>
        {use && (
            <>
                <div className="content">
                    <section className='sectionShose'>
                        <div className="itemS">
                            <i className="fa-solid fa-gem itemCenter item2" onClick={pedraUser}></i>
                            <i className="fa-solid fa-scroll itemCenter item2" onClick={papelUser}></i>
                            <i className="fa-solid fa-scissors itemCenter item2" onClick={tesouraUser}></i>
                        </div>
                        <div className="escolhido">
                            {/* <i class="fa-solid fa-scissors itemCenterEscolha"></i> */}
                            {valorUser===0 && (<i className='itemCenterEscolha'>Faça a Sua Escolha</i>)}
                            {valorUser===1 && (<i className='fa-solid fa-gem itemCenterEscolha'></i>)}
                            {valorUser===2 && (<i className='fa-solid fa-scroll itemCenterEscolha'></i>)}
                            {valorUser===3 && (<i className='fa-solid fa-scissors itemCenterEscolha'></i>)}
                        </div>
                    </section>
                    <section className="sectionallShose">
                        <div className="itemS">
                            <i className="fa-solid fa-gem itemCenter"></i>
                            <i className="fa-solid fa-scroll itemCenter"></i>
                            <i className="fa-solid fa-scissors itemCenter"></i>
                        </div>
                        <div className="escolhido">
                            {valorComputador===0 && (<i className='itemCenterEscolha'>Escolha do Computador</i>)}
                            {show && (
                                <>
                                    {valorComputador===1 && (<i className='fa-solid fa-gem itemCenterEscolha'></i>)}
                                    {valorComputador===2 && (<i className='fa-solid fa-scroll itemCenterEscolha'></i>)}
                                    {valorComputador===3 && (<i className='fa-solid fa-scissors itemCenterEscolha'></i>)}
                                </>
                            )}
                        </div>
                    </section>
                </div>
                <div className="content">
                    <section className='sectionShose'>
                        <div className="itemS">
                            {userPoint}
                        </div>
                    </section>
                    <section className="sectionallShose">
                        <div className="itemS">
                            {computerPoint}
                        </div>
                    </section>
                </div>
                <section className="result">
                    <p className='resultP'>{result}</p>
                    <p className='resultP'>Código da sala: {sala}</p>
                    <button className='jogarNovamente' onClick={novojogo}>Jogar Novamente...</button>
                    <button className='jogarNovamente nui' onClick={verificar}>Verificar...</button>
                </section>
            </>
        )}
        {!use && (
            <div className="nomeUser">
                <input type="text" className="name" placeholder='User' onChange={(e)=>setUsername(e.target.value)} />
                <input type="text" className="name" placeholder='Sala' onChange={(e)=>setSala(e.target.value)} />
                <button className='buttonUser' onClick={addUser}>Entrar</button>
            </div>
        )}
    </div>
  )
}
