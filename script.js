/* ===== CONTROLE DE TELAS ===== */
const telas = ["home", "ranking", "copa", "campeonato"];

function mostrarTela(id) {
    telas.forEach(t => document.getElementById(t).hidden = true);
    document.getElementById(id).hidden = false;
    document.getElementById("btn-voltar").hidden = (id === "home");
}

function voltar() { mostrarTela("home"); }
function abrirRanking() { mostrarTela("ranking"); renderRankingFCI(); }
function abrirCopa() { mostrarTela("copa"); abaCopa("geral"); }
function abrirCampeonato() { mostrarTela("campeonato"); }

/* ===== EDIÇÕES COPA===== */
let edicoes = {
    edicao1: {
        copaDados: {
            confrontoDestaque: {
                fase: "Fase 1",
                status: "em_breve",
                timeA: { nome: "Pitoco", logo: "logos/Pitoco.png" },
                placarA: 0,
                timeB: { nome: "Cedru", logo: "logos/Cedru.png" },
                placarB: 0
            },
            competidorDestaque: { nome: "Pitoco", logo: "logos/Pitoco.png" },
            ultimoCampeao: { nome: "Nenhum", titulos: 0 },
            maiorCampeao: { nome: "Nenhum", titulos: 0 },
            ultimaAtualizacao: "02/01/2026"
        },
        confrontos: [
            { fase: "Fase 1", jogos: [
                jogo("Pitoco","Cedru","em_breve",0,0,""),
                jogo("Cedru","Pitoco","em_breve",0,0,"")
            ]},
            { fase: "Quartas", jogos: [
                jogo("FIA","Meowflix","em_breve",0,0,""),
                jogo("Meowflix","FIA","em_breve",0,0,""),
                jogo("Jaonez","Iriz","em_breve",0,0,""),
                jogo("Iriz","Jaonez","em_breve",0,0,""),
                jogo("Catarina","Mclovin","em_breve",0,0,""),
                jogo("Mclovin","Catarina","em_breve",0,0,""),
            
            ]}
        ],
        chaveamento: {
            quartas: [
                { a: "A definir", logoA: "logos/default.png", b: "A definir", logoB: "logos/default.png", placarA: "-", placarB: "-" },
                { a: "A definir", logoA: "logos/default.png", b: "A definir", logoB: "logos/default.png", placarA: "-", placarB: "-" },
                { a: "A definir", logoA: "logos/default.png", b: "A definir", logoB: "logos/default.png", placarA: "-", placarB: "-" },
                { a: "A definir", logoA: "logos/default.png", b: "Shiro", logoB: "logos/Shiro.png", placarA: "-", placarB: "-" }
            ],
            semifinal: [
                { a:"WQ1", logoA:"logos/default.png", b:"WQ2", logoB:"logos/default.png", placarA:"-", placarB:"-" },
                { a:"WQ3", logoA:"logos/default.png", b:"WQ4", logoB:"logos/default.png", placarA:"-", placarB:"-" }
            ],
            final: [
                { a:"WS1", logoA:"logos/default.png", b:"WS2", logoB:"logos/default.png", placarA:"-", placarB:"-" }
            ]
        }
    },
    edicao2: {
        // você define depois os dados da segunda edição
        copaDados: {},
        confrontos: [],
        chaveamento: { quartas:[], semifinal:[], final:[] }
    }
};

let edicaoAtual = "edicao1";

function mudarEdicao() {
    const select = document.getElementById("select-edicao");
    edicaoAtual = select.value;
    abaCopa(document.querySelector(".abas button.ativo").textContent.toLowerCase().replace(" ",""));
}


/* ===== FUNÇÃO JOGO ===== */
function jogo(a,b,status= "em_breve", placarA=0,placarB=0,penal="") {
    return { timeA:{nome:a,logo:`logos/${a}.png`}, placarA, timeB:{nome:b,logo:`logos/${b}.png`}, placarB, status, penal };
}

/* ===== ABAS DA COPA ===== */
function abaCopa(aba) {
    document.querySelectorAll(".abas button").forEach(b => b.classList.remove("ativo"));
    const btns = document.querySelectorAll(".abas button");
    if(aba=="geral") btns[0].classList.add("ativo");
    if(aba=="confrontos") btns[1].classList.add("ativo");
    if(aba=="chaveamento") btns[2].classList.add("ativo");

    document.getElementById("copa-geral").hidden = aba!=="geral";
    document.getElementById("copa-confrontos").hidden = aba!=="confrontos";
    document.getElementById("copa-chaveamento").hidden = aba!=="chaveamento";

    if(aba==="geral") renderCopaGeral();
    if(aba==="confrontos") renderCopaConfrontos();
    if(aba==="chaveamento") renderChaveamento();
}

/* ===== RENDER – VISÃO GERAL ===== */
function renderCopaGeral(){
    const c = edicoes[edicaoAtual].copaDados.confrontoDestaque;
    const statusMap = { 
        em_breve:["Em breve","status-breve"], 
        em_andamento:["Em andamento","status-andamento"], 
        encerrado:["Encerrado","status-encerrado"],
        adefinir: ["A definir", "status-definindo"]
    };
    const [texto,classe] = statusMap[c.status];
    document.getElementById("copa-geral").innerHTML=`
    <div class="card">
        <h3>${c.fase}</h3>
        <div class="confronto">
            <div class="time">${c.timeA.nome} <img class="logo" src="${c.timeA.logo}"></div>
            <div class="placar-area">
                <div class="placar">${c.placarA} x ${c.placarB}</div>
                <div class="status ${classe}">${texto}</div>
            </div>
            <div class="time">${c.timeB.nome} <img class="logo" src="${c.timeB.logo}"></div>
        </div>
    </div>
    <div class="card">
        <h3>Competidor em destaque</h3>
        <div class="time">${edicoes[edicaoAtual].copaDados.competidorDestaque.nome} <img class="logo" src="${edicoes[edicaoAtual].copaDados.competidorDestaque.logo}"></div>
    </div>
    <div class="card">
        <p>🏆 Último campeão: ${edicoes[edicaoAtual].copaDados.ultimoCampeao.nome} (${edicoes[edicaoAtual].copaDados.ultimoCampeao.titulos})</p>
        <p>👑 Maior campeão: ${edicoes[edicaoAtual].copaDados.maiorCampeao.nome} (${edicoes[edicaoAtual].copaDados.maiorCampeao.titulos})</p>
        <p>📅 Atualizado em: ${edicoes[edicaoAtual].copaDados.ultimaAtualizacao}</p>
    </div>
    `;
}

/* ===== RENDER – CONFRONTOS ===== */
function renderCopaConfrontos(){
    const ed = edicoes[edicaoAtual].confrontos;
    let html = "";
    ed.forEach(f=>{
        html+=`<div class="card"><h3>${f.fase}</h3>`;
        if(f.jogos.length===0){ html+=`<p style="opacity:.6">A definir</p>`; }
        else{
            f.jogos.forEach(j=>{
                const statusMap = { 
                    em_breve:["Em breve","status-breve"], 
                    em_andamento:["Em andamento","status-andamento"], 
                    encerrado:["Encerrado","status-encerrado"],
                    adefinir: ["A Definir", ".status-definindo"]
                };
                const [texto,classe]=statusMap[j.status];
                let extra="";
                if(j.penal) extra+=` (Pen: ${j.penal})`;
                html+=`
                <div class="confronto">
                    <div class="time">${j.timeA.nome} <img class="logo" src="${j.timeA.logo}"></div>
                    <div class="placar-area">
                        ${j.placarA} x ${j.placarB} ${j.placarA+j.placarB? "(Agg)"+(j.placarA+j.placarB):""}${extra}
                        <div class="status ${classe}">${texto}</div>
                    </div>
                    <div class="time">${j.timeB.nome} <img class="logo" src="${j.timeB.logo}"></div>
                </div>`;
            });
        }
        html+=`</div>`;
    });
    document.getElementById("copa-confrontos").innerHTML=html;
}

/* ===== RENDER – CHAVEAMENTO ===== */
function renderChaveamento(){
    const c=document.getElementById("copa-chaveamento");
    const ch=edicoes[edicaoAtual].chaveamento;
    c.innerHTML=`
        <div class="chave-grid">
            <div class="coluna quartas">
                <h3>Quartas</h3>
                ${ch.quartas.map(cardJogo).join("")}
            </div>
            <div class="coluna semifinal">
                <h3>Semifinal</h3>
                ${ch.semifinal.map(cardJogo).join("")}
            </div>
            <div class="coluna final">
                <h3>Final</h3>
                ${ch.final.map(cardJogo).join("")}
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
    </div>`;
}


//COPA /\
//CAMPEONATO \/

// Edições Campeonato

let campeonatoEdicoes = {
    edicao1: {

        /* ===== VISÃO GERAL ===== */
        confrontoDestaque: {
            rodada: "Rodada 1",
            status: "adefinir", // adefinir | em_breve | em_andamento | encerrado
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
                    jogo("LF1CDA", "LQRCDA", "adefinir", 0, 0),
                ]
            }
        ],

        /* ===== CLASSIFICAÇÃO  ===== */
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

        // 1️⃣ Pontos
        if (b.pontos !== a.pontos) return b.pontos - a.pontos;

        // 2️⃣ Saldo de gols
        if (b.saldo !== a.saldo) return b.saldo - a.saldo;

        // 3️⃣ Vitórias
        if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;

       // CORRETO – menos simulações = melhor
        if (a.simulacoes !== b.simulacoes) return a.simulacoes - b.simulacoes;

        // 5️⃣ Ordem alfabética (fallback absoluto)
        return a.nome.localeCompare(b.nome);
    });
}

// ABRIR CAMPEONATO

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

//RENDER

function renderCampeonatoGeral() {
    const d = campeonatoEdicoes[campeonatoEdicaoAtual];
    const c = d.confrontoDestaque;

    const statusMap = {
        em_breve: ["Em breve", "status-breve"],
        em_andamento: ["Em andamento", "status-andamento"],
        encerrado: ["Encerrado", "status-encerrado"],
        adefinir: ["A definir", "status-definindo"]
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
        else if (pos === 7) classe = "repescagem"; // preparado pro futuro

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

/* ===== RANKING FCI ===== */

const rankingFCI = [
    {
        nome: "Miguel",
        pontuacao: 324,
        titulos: 6,
        competicoes: 12,
        simulacoes: 7
    },
    {
        nome: "Junior",
        pontuacao: 273,
        titulos: 3,
        competicoes: 12,
        simulacoes: 4
    },
    {
        nome: "Jaonez ",
        pontuacao: 151,
        titulos: 1,
        competicoes: 12,
        simulacoes: 7
    },
    {
        nome: "Iriz",
        pontuacao: 143,
        titulos: 0,
        competicoes: 8,
        simulacoes: 2
    },
    {
        nome: "Lorenzo",
        pontuacao: 104,
        titulos: 1,
        competicoes: 8,
        simulacoes: 8
    },
    {
        nome: "Daniel",
        pontuacao: 91,
        titulos: 0,
        competicoes: 9,
        simulacoes: 5
    },
    {
        nome: "Henri",
        pontuacao: 81,
        titulos: 0,
        competicoes: 3,
        simulacoes: 3
    },
    {
        nome: "Gatobugado",
        pontuacao: 76,
        titulos: 0,
        competicoes: 3,
        simulacoes: 0
    },
    {
        nome: "Meowflix",
        pontuacao: 74,
        titulos: 0,
        competicoes: 8,
        simulacoes: 6
    },
    {
        nome: "Cedru",
        pontuacao: 74,
        titulos: 0,
        competicoes: 6,
        simulacoes: 1
    },
    {
        nome: "Nexx",
        pontuacao: 61,
        titulos: 0,
        competicoes: 6,
        simulacoes: 10
    },
    {
        nome: "Pedritas",
        pontuacao: 48,
        titulos: 0,
        competicoes: 6,
        simulacoes: 9
    },
    {
        nome: "Boyzinho",
        pontuacao: 25,
        titulos: 0,
        competicoes: 1,
        simulacoes: 0
    },
    {
        nome: "Foguetynho",
        pontuacao: 25,
        titulos: 0,
        competicoes: 7,
        simulacoes: 6
    },
    {
        nome: "Shiro",
        pontuacao: 24,
        titulos: 0,
        competicoes: 2,
        simulacoes: 0
    },
    {
        nome: "Orange",
        pontuacao: 22,
        titulos: 0,
        competicoes: 2,
        simulacoes: 0
    },
    {
        nome: "T4",
        pontuacao: 20,
        titulos: 0,
        competicoes: 3,
        simulacoes: 10
    },
    {
        nome: "Turco",
        pontuacao: 19,
        titulos: 0,
        competicoes: 5,
        simulacoes: 0
    },
    {
        nome: "Trident",
        pontuacao: 18,
        titulos: 0,
        competicoes: 2,
        simulacoes: 0
    },
    {
        nome: "Mr Machinima",
        pontuacao: 16,
        titulos: 0,
        competicoes: 2,
        simulacoes: 0
    },
    {
        nome: "JpFreitas",
        pontuacao: 10,
        titulos: 0,
        competicoes: 1,
        simulacoes: 0
    },
    {
        nome: "Catarina",
        pontuacao: 6,
        titulos: 0,
        competicoes: 1,
        simulacoes: 0
    },
    {
        nome: "FIA",
        pontuacao: 3,
        titulos: 0,
        competicoes: 1,
        simulacoes: 9
    },
    {
        nome: "Jpeg",
        pontuacao: 3,
        titulos: 0,
        competicoes: 1,
        simulacoes: 2
    },
    {
        nome: "Akai",
        pontuacao: 0,
        titulos: 0,
        competicoes: 1,
        simulacoes: 0
    },
    {
        nome: "Dart",
        pontuacao: 0,
        titulos: 0,
        competicoes: 1,
        simulacoes: 0
    },
    {
        nome: "Silver",
        pontuacao: 0,
        titulos: 0,
        competicoes: 1,
        simulacoes: 0
    },
    {
        nome: "Pitoco",
        pontuacao: 0,
        titulos: 0,
        competicoes: 0,
        simulacoes: 0
    }
];

function ordenarRankingFCI(lista) {
    return [...lista].sort((a, b) => {

        // 1️⃣ Pontuação total
        if (b.pontuacao !== a.pontuacao) return b.pontuacao - a.pontuacao;

        // 2️⃣ Títulos
        if (b.titulos !== a.titulos) return b.titulos - a.titulos;

        // 3️⃣ Competições jogadas
        if (b.competicoes !== a.competicoes) return b.competicoes - a.competicoes;

        // 4️⃣ Simulações (negativo)
        if (a.simulacoes !== b.simulacoes) return a.simulacoes - b.simulacoes;

        // 5️⃣ Ordem alfabética
        return a.nome.localeCompare(b.nome);
    });
}

function renderRankingFCI() {
    const lista = ordenarRankingFCI(rankingFCI);

    let html = `
        <h2 style="margin-bottom:12px">RANKING FCI</h2>

        <table class="ranking-tabela">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Pontuação Total</th>
                    <th>Títulos</th>
                    <th>Competições</th>
                    <th>Simulações</th>
                </tr>
            </thead>
            <tbody>
    `;

    lista.forEach((t, i) => {
        html += `
            <tr>
                <td>${i + 1}</td>
                <td>${t.nome}</td>
                <td>${t.pontuacao}</td>
                <td>${t.titulos}</td>
                <td>${t.competicoes}</td>
                <td>${t.simulacoes}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    document.getElementById("ranking").innerHTML = html;
}
