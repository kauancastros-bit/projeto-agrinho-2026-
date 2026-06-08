// Projeto Agrinho 2026: Agro Forte e Futuro Sustentável
// Tema: Painel Interativo de Agricultura de Precisão

let plantas = [];
let totalColheita = 0;
let aguaEconomizada = 0;
let colheitaMeta = 60;

// Variáveis para o Gráfico Comparativo
let aguaTradicional = 0;
let aguaUtilizadaPrecisao = 0;

let estadoJogo = "TUTORIAL"; 
let txtFlutuante = "";
let txtX = 0, txtY = 0, txtTimer = 0;

function setup() {
  createCanvas(850, 550);
  // Organizando a plantação deixando espaço na direita para o gráfico
  for (let x = 60; x < 550; x += 95) {
    for (let y = 160; y < height - 60; y += 95) {
      plantas.push(new Planta(x, y));
    }
  }
}

function draw() {
  if (estadoJogo === "TUTORIAL") {
    telaInicialTutorial();
  } else if (estadoJogo === "JOGANDO") {
    rodarSimulador();
  } else if (estadoJogo === "FIM") {
    telaSucesso();
  }
}

function rodarSimulador() {
  background('#3d2f25'); // Solo fértil escuro
  
  // --- PAINEL SUPERIOR INFORMATIVO ---
  fill('#130f40');
  rect(0, 0, width, 100);
  
  fill('#2ecc71');
  textSize(18);
  textStyle(BOLD);
  textAlign(LEFT);
  text("AGRINHO 2026 • TECNOLOGIA P5.JS NO CAMPO", 20, 30);
  
  fill(255);
  textStyle(NORMAL);
  textSize(12);
  text("Como funciona: O círculo VERMELHO mostra que os sensores do solo detectaram sede na planta.", 20, 55);
  text("Ação: Passe o drone sobre ela para liberar a gota exata de água. O desperdício cai para ZERO!", 20, 75);

  // --- BARRA LATERAL CIENTÍFICA (GRÁFICO) ---
  fill('#1e272e');
  rect(600, 100, 250, height - 100);
  
  // Título do Gráfico
  fill(255);
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER);
  text("MÉTRICA DE SUSTENTABILIDADE", 725, 130);
  text("Gasto Estimado de Água (Litros)", 725, 270);
  
  // Indicadores Numéricos
  textAlign(LEFT);
  textSize(14);
  fill('#f1c40f');
  text(`🌱 Alimentos: ${totalColheita} / ${colheitaMeta} Ton`, 620, 170);
  fill('#3498db');
  text(`💧 Poupados: ${aguaEconomizada} L`, 620, 200);
  
  // Desenho do Gráfico Comparativo
  // 1. Barra Tradicional (Gasta mais)
  fill('#e74c3c');
  let altTradicional = map(aguaTradicional, 0, 15000, 0, 150, true); // O 'true' impede a barra de passar do limite do gráfico
  rect(650, 450, 40, -altTradicional);
  
  // 2. Barra de Precisão (Econômica)
  fill('#2ecc71');
  let altPrecisao = map(aguaUtilizadaPrecisao, 0, 15000, 0, 150, true);
  rect(740, 450, 40, -altPrecisao);
  
  // Legendas do Gráfico
  fill(255);
  textSize(10);
  textStyle(NORMAL);
  textAlign(CENTER);
  text("Método\nComum", 670, 470);
  text("Uso de\nPrecisão", 760, 470);
  
  // Linha de base do gráfico
  stroke(255, 50);
  line(620, 450, 810, 450);
  noStroke();

  // --- ATUALIZAÇÃO DAS PLANTAS ---
  for (let p of plantas) {
    p.mostrar();
    p.verificarDrone(mouseX, mouseY);
  }

  // Drone e Mensagens
  desenharDrone(mouseX, mouseY);
  exibirTextoImpacto();
  
  // Simula o gasto contínuo do método tradicional
  if (frameCount % 5 === 0) {
    aguaTradicional += 45;
  }

  if (totalColheita >= colheitaMeta) {
    estadoJogo = "FIM";
  }
}

function telaInicialTutorial() {
  background('#1b2a4a');
  textAlign(CENTER);
  
  fill('#2ecc71');
  textSize(26);
  textStyle(BOLD);
  text("PROJETO ECO-CAMPO INTERATIVO", width/2, 90);
  
  fill(255);
  textSize(15);
  textStyle(NORMAL);
  text("Tema: Agro Forte e Futuro Sustentável", width/2, 130);
  
  // Bloco de instruções
  fill(25, 42, 86, 200);
  stroke('#2ecc71');
  rect(120, 170, 610, 220, 8);
  noStroke();
  
  fill(255);
  textSize(13);
  textAlign(LEFT);
  let instrucoes = 
    "PROPOSTA DIDÁTICA:\n" +
    "Demonstrar visualmente a diferença entre a agricultura antiga e a digital.\n\n" +
    "• SISTEMA DE SENSORES: As plantas avisam quando estão com estresse hídrico.\n" +
    "• DRONE COM IA: Passando o mouse, você faz a aplicação cirúrgica de recursos.\n" +
    "• GRÁFICO EM TEMPO REAL: Veja o gráfico comparar o gasto de água de uma plantação\n" +
    "  com a nossa plantação tecnológica.\n\n" +
    "Seu objetivo é atingir a meta de colheita mostrando que a tecnologia protege a natureza.";
  text(instrucoes, 140, 200);
  
  textAlign(CENTER);
  fill('#27ae60');
  rect(325, 425, 200, 45, 10);
  fill(255);
  textStyle(BOLD);
  text("INICIAR SIMULAÇÃO", width/2, 452);
}

function telaSucesso() {
  background('#16a085');
  textAlign(CENTER);
  
  fill(255);
  textSize(32);
  textStyle(BOLD);
  text("PRODUÇÃO CONCLUÍDA COM SUCESSO! 🌾", width/2, 150);
  
  textSize(18);
  textStyle(NORMAL);
  text(`Total de Alimentos Produzidos: ${totalColheita} Toneladas`, width/2, 220);
  
  fill('#2c3e50');
  rect(150, 270, 550, 120, 10);
  
  fill(255);
  textStyle(BOLD);
  text(`Água poupada graças aos códigos e sensores: ${aguaEconomizada} Litros`, width/2, 310);
  
  textSize(14);
  textStyle(ITALIC);
  fill('#f1c40f');
  text("Conclusão: O Agro se torna Forte através da eficiência,", width/2, 350);
  text("e o Futuro Sustentável se constrói com tecnologia de precisão!", width/2, 370);
}

function mousePressed() {
  if (estadoJogo === "TUTORIAL") {
    // Verifica se o clique ocorreu EXATAMENTE dentro das dimensões do botão verde
    if (mouseX > 325 && mouseX < 525 && mouseY > 425 && mouseY < 470) {
      estadoJogo = "JOGANDO";
    }
  }
}

// --- CLASSE PLANTA COM LEGENDA ---
class Planta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 15;
    this.cor = '#e67e22'; 
    this.precisaAgua = true;
    this.jaRegouNesteCiclo = false; // NOVA TRAVA: Evita o drone regar várias vezes seguidas no mesmo milissegundo
  }

  mostrar() {
    // Alerta do Sensor de Solo
    noFill();
    strokeWeight(2);
    if (this.precisaAgua) {
      stroke('#e74c3c'); // Vermelho: Necessidade crítica detectada
    } else {
      stroke('#2ecc71'); // Verde: Nutrição ideal
    }
    ellipse(this.x, this.y, 60, 60);
    noStroke();

    // Desenho do vegetal
    fill(this.cor);
    ellipse(this.x, this.y, this.tamanho, this.tamanho);
    
    // Pequena folha indicativa
    if (this.tamanho > 25) {
      fill('#27ae60');
      ellipse(this.x + 8, this.y - 8, 10, 6);
    }
    
    // Subtexto explicativo embaixo da planta
    fill(200);
    textSize(9);
    textAlign(CENTER);
    if (this.precisaAgua) {
      text("Falta Água", this.x, this.y + 42);
    } else {
      text("Equilíbrio", this.x, this.y + 42);
    }
  }

  verificarDrone(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    
    // O drone interage se estiver perto E a planta precisar de água E o drone ainda não tiver agido neste ciclo de aproximação
    if (d < 30 && this.precisaAgua && !this.jaRegouNesteCiclo) {
      this.precisaAgua = false;
      this.jaRegouNesteCiclo = true; // Ativa a trava
      this.tamanho += 15;
      
      // Atualiza a lógica matemática do gráfico
      aguaUtilizadaPrecisao += 10; 
      aguaEconomizada += 140;      
      
      // Mensagem flutuante educativa
      txtFlutuante = "Gota exata aplicada! +140L economizados";
      txtX = this.x;
      txtY = this.y - 25;
      txtTimer = 35;
      
      // Ciclo de maturação
      if (this.tamanho === 30) {
        this.cor = '#2ecc71'; 
      } else if (this.tamanho === 45) {
        this.cor = '#27ae60'; 
      } else if (this.tamanho >= 60) {
        this.cor = '#f1c40f'; // Pronto para colheita sustentável
        totalColheita += 6;
        
        // Reinicia o ciclo (Rotação de cultura)
        this.tamanho = 15;
        this.cor = '#e67e22';
        this.precisaAgua = true;
      }
    }
    
    // Se o drone se afastar da planta, reseta a trava para que ela possa ser regada futuramente
    if (d > 40) {
      this.jaRegouNesteCiclo = false;
    }
    
    // Sorteio aleatório para simular a evaporação natural (Apenas se ela já estiver alimentada)
    if (!this.precisaAgua && random(1000) < 3) {
      this.precisaAgua = true;
    }
  }
}

function desenharDrone(x, y) {
  stroke('#7f8c8d');
  strokeWeight(2);
  line(x - 15, y - 15, x + 15, y + 25);
  line(x + 15, y - 15, x - 15, y + 25);
  
  fill('#ecf0f1');
  noStroke();
  ellipse(x, y, 16, 16);
  
  // Raio Scanner de Diagnóstico por IA
  fill(52, 152, 219, 40);
  ellipse(x, y, 40, 40);
}

function exibirTextoImpacto() {
  if (txtTimer > 0) {
    fill('#3498db');
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER);
    text(txtFlutuante, txtX, txtY);
    txtY -= 0.3;
    txtTimer--;
  }
}                                                                                                
