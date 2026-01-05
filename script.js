/* ===== CONTROLE DE TELAS ===== */
const telas = ["home", "ranking", "copa", "campeonato"];

function mostrarTela(id) {
    telas.forEach(t => document.getElementById(t).hidden = true);
    document.getElementById(id).hidden = false;
    document.getElementById("btn-voltar").hidden = (id === "home");
}

function voltar() { mostrarTela("home"); }
function abrirRanking() { mostrarTela("ranking"); }
function abrirCopa() { mostrarTela("copa"); abaCopa("geral"); }
function abrirCampeonato() { mostrarTela("campeonato"); }

/* ===== DADOS – EDIÇÕES ===== */
let edicaoAtual = "1"; // padrão
function mudarEdicao() {
    edicaoAtual = document.getElementById("select-edicao").value;
    // Aqui você poderá redefinir os dados dos jogos e chaveamento por edição
    console.log("Edição selecionada:", edicaoAtual);
}

/* ===== DADOS – VISÃO GERAL ===== */
const copaDados = {
    confrontoDestaque: {
        fase: "Fase 1",
        status: "em_breve", // em_breve | em_andamento | encerrado
        timeA: { nome: "Pitoco", logo: "logos/pitoco.png" },
        placarA: 0,
        timeB: { nome: "Cedru", logo: "logos/cedru.png" },
        placarB: 0
    },
    competidorDestaque: { nome: "Pitoco", logo: "logos/pitoco.png" },
    ultimoCampeao: { nome: "Nenhum", titulos: 0 },
    maiorCampeao: { nome: "Nenhum", titulos: 0 },
    ultimaAtualizacao: "02/01/2026"
};

/* ===== DADOS – CONFRONTOS ===== */
const confrontosCopa = {
    "1": [
        { fase: "Fase 1", jogos: [
            jogo("Pitoco","Cedru","em_breve",0,0), 
            jogo("Cedru","Pitoco","em_breve",0,0)
        ]},
        { fase: "Quartas", jogos: [
            jogo("Fia","Meowflix","em_breve",0,0), 
            jogo("Meowflix","Fia","em_breve"),
            jogo("Jogos","Iriz","em_breve",0,0), 
            jogo("Iriz","Jogos","em_breve",0,0),
            jogo("Catarina","Mclovin","em_breve",0,0), 
            jogo("Mclovin","Catarina","em_breve",0,0),
            jogo("WF1","Shiro","em_breve",0,0), 
            jogo("Shiro","WF1","em_breve",0,0)
        ]},
        { fase: "Semifinal", jogos: [] },
        { fase: "3º Lugar", jogos: [] },
        { fase: "Final", jogos: [] }
    ],
    "2": []
};

function jogo(a, b, status = "em_breve", placarA = 0, placarB = 0, agregado = "", penaltis = "") {
    return {
        timeA: { nome: a, logo: `logos/${a}.png` },
        placarA,
        timeB: { nome: b, logo: `logos/${b}.png` },
        placarB,
        status,
        agregado,
        penaltis
    };
}


/* ===== DADOS – CHAVEAMENTO ===== */
const chaveamento = {
    "1": {
        quartas: [
            { a: "Vencedor Fase 1", logoA:"logos/default.png", b:"Shiro", logoB:"logos/Shiro.png", placarA:"-", placarB:"-" },
            { a:"A definir", logoA:"logos/default.png", b:"A definir", logoB:"logos/default.png", placarA:"-", placarB:"-" },
            { a:"A definir", logoA:"logos/default.png", b:"A definir", logoB:"logos/default.png", placarA:"-", placarB:"-" },
            { a:"A definir", logoA:"logos/default.png", b:"A definir", logoB:"logos/default.png", placarA:"-", placarB:"-" }
        ],
        semifinal:[
            { a:"A definir", logoA:"logos/default.png", b:"A definir", logoB:"logos/default.png", placarA:"-", placarB:"-" },
            { a:"A definir", logoA:"logos/default.png", b:"A definir", logoB:"logos/default.png", placarA:"-", placarB:"-" }
        ],
        final:[
            { a:"A definir", logoA:"logos/default.png", b:"A definir", logoB:"logos/default.png", placarA:"-", placarB:"-" }
        ]
    },
    "2": {} // futura edição
};

/* ===== ABAS DA COPA ===== */
function abaCopa(aba){
    document.querySelectorAll(".abas button").forEach(b => b.classList.remove("ativo"));
    const btns = document.querySelectorAll(".abas button");
    if(aba==="geral") btns[0].classList.add("ativo");
    if(aba==="confrontos") btns[1].classList.add("ativo");
    if(aba==="chaveamento") btns[2].classList.add("ativo");

    document.getElementById("copa-geral").hidden=aba!=="geral";
    document.getElementById("copa-confrontos").hidden=aba!=="confrontos";
    document.getElementById("copa-chaveamento").hidden=aba!=="chaveamento";

    if(aba==="geral") renderCopaGeral();
    if(aba==="confrontos") renderCopaConfrontos();
    if(aba==="chaveamento") renderChaveamento();
}

/* ===== VISÃO GERAL ===== */
function renderCopaGeral(){
    const c=copaDados.confrontoDestaque;
    const statusMap={em_breve:["Em breve","status-breve"],em_andamento:["Em andamento","status-andamento"],encerrado:["Encerrado","status-encerrado"]};
    const [texto,classe]=statusMap[c.status];

    document.getElementById("copa-geral").innerHTML=`
        <div class="card">
            <h3>${c.fase}</h3>
            <div class="confronto">
                <div class="time">${c.timeA.nome} <img class="logo" src="${c.timeA.logo}"></div>
                <div class="placar-area">
                    <div class="placar">${c.placarA} x ${c.placarB}</div>
                    <div class="status ${classe}">${texto}</div>
                </div>
                <div class="time visitant">${c.timeB.nome} <img class="logo" src="${c.timeB.logo}"></div>
            </div>
        </div>
        <div class="card">
            <h3>Competidor em destaque</h3>
            <div class="time">${copaDados.competidorDestaque.nome} <img class="logo" src="${copaDados.competidorDestaque.logo}"></div>
        </div>
        <div class="card">
            <p>🏆 Último campeão: ${copaDados.ultimoCampeao.nome} (${copaDados.ultimoCampeao.titulos})</p>
            <p>👑 Maior campeão: ${copaDados.maiorCampeao.nome} (${copaDados.maiorCampeao.titulos})</p>
            <p>📅 Atualizado em: ${copaDados.ultimaAtualizacao}</p>
        </div>
    `;
}

/* ===== CONFRONTOS ===== */
function renderCopaConfrontos(){
    const dados=confrontosCopa[edicaoAtual];
    let html="";
    dados.forEach(f=>{
        html+=`<div class="card"><h3>${f.fase}</h3>`;
        if(f.jogos.length===0){html+=`<p style="opacity:.6">A definir</p>`}
        else{
            f.jogos.forEach(j=>{
                let statusMap={em_breve:["Em breve","status-breve"],em_andamento:["Em andamento","status-andamento"],encerrado:["Encerrado","status-encerrado"]};
                let [texto,classe]=statusMap[j.status];
                let agregado=j.agregado?`<div class="placar-agregado">Agregado: ${j.agregado}</div>`:"";
                let penaltis=j.penaltis?`<div class="placar-agregado">Penaltis: ${j.penaltis}</div>`:"";
                html+=`
                <div class="confronto">
                    <div class="time">${j.timeA.nome} <img class="logo" src="${j.timeA.logo}"></div>
                    <div class="placar-area">
                        <div class="placar">${j.placarA} x ${j.placarB}</div>
                        ${agregado}${penaltis}
                        <div class="status ${classe}">${texto}</div>
                    </div>
                    <div class="time visitant">${j.timeB.nome} <img class="logo" src="${j.timeB.logo}"></div>
                </div>
                `;
            })
        }
        html+="</div>";
    })
    document.getElementById("copa-confrontos").innerHTML=html;
}

/* ===== CHAVEAMENTO ===== */
function renderChaveamento(){
    const c=document.getElementById("copa-chaveamento");
    const dados=chaveamento[edicaoAtual];
    c.innerHTML=`
        <div class="chave-grid">
            <div class="coluna quartas">
                <h3>Quartas</h3>
                ${dados.quartas.map(cardJogo).join("")}
            </div>
            <div class="coluna semifinal">
                <h3>Semifinal</h3>
                ${dados.semifinal.map(cardJogo).join("")}
            </div>
            <div class="coluna final">
                <h3>Final</h3>
                ${dados.final.map(cardJogo).join("")}
            </div>
        </div>
    `;
}

function cardJogo(j){
    return `
    <div class="card-chave">
        <div class="linha">${j.a} <img src="${j.logoA}"></div>
        <div class="placar-chave">${j.placarA} : ${j.placarB}</div>
        <div class="linha">${j.b} <img src="${j.logoB}"></div>
    </div>
    `;
}

// COPA /\
// CAMPEONATO \/

function abrirCampeonato() {
    mostrarTela("campeonato");
    abaCampeonato("geral");
}

function abaCampeonato(aba) {

    document.querySelectorAll("#campeonato .abas button")
        .forEach(b => b.classList.remove("ativo"));

    const btns = document.querySelectorAll("#campeonato .abas button");
    if (aba === "geral") btns[0].classList.add("ativo");
    if (aba === "confrontos") btns[1].classList.add("ativo");
    if (aba === "classificacao") btns[2].classList.add("ativo");

    document.getElementById("campeonato-geral").hidden = aba !== "geral";
    document.getElementById("campeonato-confrontos").hidden = aba !== "confrontos";
    document.getElementById("campeonato-classificacao").hidden = aba !== "classificacao";

    if (aba === "geral") renderCampeonatoGeral();
    if (aba === "confrontos") renderCampeonatoConfrontos();
    if (aba === "classificacao") renderCampeonatoClassificacao();
}


//Edições


let campeonatoEdicoes = {
    edicao1: {

        /* ===== VISÃO GERAL ===== */
        confrontoDestaque: {
            rodada: "Rodada 1",
            status: "em_breve", // em_breve | em_andamento | encerrado
            timeA: { nome: "A definir", logo: "logos/default.png" },
            placarA: 0,
            timeB: { nome: "A definir", logo: "logos/default.png" },
            placarB: 0
        },

        competidorDestaque: {
            nome: "Pitoco",
            logo: "logos/Pitoco.png",
            pontos: 0,
            saldo: 0
        },

        ultimoCampeao: { nome: "Nenhum", titulos: 0 },
        maiorCampeao: { nome: "Nenhum", titulos: 0 },
        ultimaAtualizacao: "02/01/2026",

        /* ===== CONFRONTOS (RODADAS) ===== */
        rodadas: [
            {
                rodada: "Rodada 1",
                jogos: [
                    jogo("A definir", "A definir", "em_breve", 0, 0),
                    jogo("A definir", "A definir", "em_breve", 0, 0)
                ]
            },
            {
                rodada: "Rodada 2",
                jogos: [
                    jogo("A definir", "A definir", "em_breve", 0, 0)
                ]
            }
        ],

        /* ===== CLASSIFICAÇÃO (RESERVADO) ===== */
        classificacao: [
        {
            nome: "Catarina",
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            saldo: 0,
            simulacoes: 0,
            pontos: 0
        },
        {
            nome: "Cedru",
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            saldo: 0,
            simulacoes: 0,
            pontos: 0
        },
        {
            nome: "FIA",
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            saldo: 0,
            simulacoes: 0,
            pontos: 0
        },
        {
            nome: "Jaonez",
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            saldo: 0,
            simulacoes: 0,
            pontos: 0
        },
        {
            nome: "Mclovin",
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            saldo: 0,
            simulacoes: 0,
            pontos: 0
        },
        {
            nome: "Meowflix",
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            saldo: 0,
            simulacoes: 0,
            pontos: 0
        },
        {
            nome: "Pitoco",
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            saldo: 0,
            simulacoes: 0,
            pontos: 0
        },
        {
            nome: "Shiro",
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            saldo: 0,
            simulacoes: 0,
            pontos: 0
        }
        ]
    },

    edicao2: {
        // futura edição
        rodadas: [],
        classificacao: []
    }
};


let campeonatoEdicaoAtual = "edicao1";

function mudarEdicaoCampeonato() {
    const select = document.getElementById("select-edicao-campeonato");
    campeonatoEdicaoAtual = select.value;
    renderCampeonatoGeral();
}

function ordenarClassificacao(lista) {
    return [...lista].sort((a, b) => {

        // 1️⃣ Pontos (maior melhor)
        if (b.pontos !== a.pontos) return b.pontos - a.pontos;

        // 2️⃣ Saldo de gols (maior melhor)
        if (b.saldo !== a.saldo) return b.saldo - a.saldo;

        // 3️⃣ Vitórias (maior melhor)
        if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;

        // 4️⃣ Simulações (MENOR É MELHOR 🔥)
        if (a.simulacoes !== b.simulacoes) return a.simulacoes - b.simulacoes;

        // 5️⃣ Ordem alfabética (fallback absoluto)
        return a.nome.localeCompare(b.nome);
    });
}



//RENDER

function renderCampeonatoGeral() {
    const d = campeonatoEdicoes[campeonatoEdicaoAtual];
    const c = d.confrontoDestaque;

    const statusMap = {
        em_breve: ["Em breve", "status-breve"],
        em_andamento: ["Em andamento", "status-andamento"],
        encerrado: ["Encerrado", "status-encerrado"],
    };

    const [texto, classe] = statusMap[c.status];

    document.getElementById("campeonato-geral").innerHTML = `
        <div class="card">
            <h3>${c.rodada}</h3>

            <div class="confronto">
                <div class="time">
                    ${c.timeA.nome}
                    <img class="logo" src="${c.timeA.logo}">
                </div>

                <div class="placar-area">
                    <div class="placar">${c.placarA} x ${c.placarB}</div>
                    <div class="status ${classe}">${texto}</div>
                </div>

                <div class="time">
                    ${c.timeB.nome}
                    <img class="logo" src="${c.timeB.logo}">
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Competidor em destaque</h3>
            <div class="time">
                ${d.competidorDestaque.nome}
                <img class="logo" src="${d.competidorDestaque.logo}">
                <span class="pontos-saldo">
                    ${d.competidorDestaque.pontos} pts | Saldo ${d.competidorDestaque.saldo}
                </span>
            </div>
        </div>

        <div class="card">
            <p>🏆 Último campeão: ${d.ultimoCampeao.nome} (${d.ultimoCampeao.titulos})</p>
            <p>👑 Maior campeão: ${d.maiorCampeao.nome} (${d.maiorCampeao.titulos})</p>
            <p>📅 Atualizado em: ${d.ultimaAtualizacao}</p>
        </div>
    `;
}

function renderCampeonatoConfrontos() {
    const ed = campeonatoEdicoes[campeonatoEdicaoAtual];
    let html = "";

    ed.rodadas.forEach(r => {
        html += `<div class="card"><h3>${r.rodada}</h3>`;

        if (r.jogos.length === 0) {
            html += `<p style="opacity:.6">A definir</p>`;
        } else {
            r.jogos.forEach(j => {

                let texto = "A definir";
                let classe = "";

                if (j.status === "em_breve") {
                    texto = "Em breve";
                    classe = "status-breve";
                }
                if (j.status === "em_andamento") {
                    texto = "Em andamento";
                    classe = "status-andamento";
                }
                if (j.status === "encerrado") {
                    texto = "Encerrado";
                    classe = "status-encerrado";
                }

                html += `
                    <div class="confronto">
                        <div class="time">
                            ${j.timeA.nome}
                            <img class="logo" src="${j.timeA.logo}">
                        </div>

                        <div class="placar-area">
                            <div class="placar">${j.placarA} x ${j.placarB}</div>
                            <div class="status ${classe}">${texto}</div>
                        </div>

                        <div class="time">
                            ${j.timeB.nome}
                            <img class="logo" src="${j.timeB.logo}">
                        </div>
                    </div>
                `;
            });
        }

        html += `</div>`;
    });

    document.getElementById("campeonato-confrontos").innerHTML = html;
}

function renderCampeonatoClassificacao() {
    const d = campeonatoEdicoes[campeonatoEdicaoAtual];
    const lista = ordenarClassificacao(d.classificacao);

    let html = `
        <div class="card">
            <table class="tabela-classificacao">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>J</th>
                        <th>V</th>
                        <th>E</th>
                        <th>D</th>
                        <th>Saldo</th>
                        <th>Sim</th>
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody>
    `;

    lista.forEach((t, i) => {
        const pos = i + 1;

        let classe = "";
        if (pos === 1) classe = "campeao";
        else if (pos >= 2 && pos <= 6) classe = "classificado";

        html += `
            <tr class="${classe}">
                <td>${pos}</td>
                <td>${t.nome}</td>
                <td>${t.jogos}</td>
                <td>${t.vitorias}</td>
                <td>${t.empates}</td>
                <td>${t.derrotas}</td>
                <td>${t.saldo}</td>
                <td>${t.simulacoes}</td>
                <td>${t.pontos}</td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    document.getElementById("campeonato-classificacao").innerHTML = html;
}
