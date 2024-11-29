import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  public mensagem: string = "";
  public filtro: string = "";
  public lista:  Produto[] = [
    /*this.mensagem = "Procure aqui seu GOD item"
    /* Os códigos são refentes as imagens, por exemplo: a imagem "carta1" tem código 1 */
    {codigo:1, nome:"Cabo 7 Portas", descritivo:"Cabo com várias portas", 
      descritivoCompleto:"O Hub USB 3.0 com 7 Portas e Interruptores Individuais é uma solução prática e eficiente para expandir a conectividade de seu computador ou laptop. Com sete portas USB 3.0 de alta velocidade, você pode conectar simultaneamente vários dispositivos como pen drives, teclados, mouses, impressoras, câmeras e muito mais. Cada porta possui um interruptor individual iluminado por LED, permitindo que você ligue ou desligue cada uma conforme necessário, otimizando o consumo de energia e protegendo os dispositivos conectados.",
      valor:30.00, quantidade:7, keywords:"Cabos, Cabo, Adaptador, Cabo Adaptador", destaque:0
    }, 
    
    {codigo:2, nome:"Cadeira Gamer", descritivo:"Cadeira confortável com inclinação personalizada",
      descritivoCompleto:"A Cadeira Gamer Ergonômica é a escolha ideal para quem busca conforto e desempenho durante longas sessões de trabalho ou jogos. Projetada com materiais de alta qualidade e um design pensado para suportar as exigências do público gamer, essa cadeira oferece suporte ergonômico, proporcionando o ajuste perfeito para o corpo e reduzindo o cansaço muscular. Com um visual moderno em preto com detalhes em vermelho, ela complementa qualquer setup gamer ou ambiente de escritório, garantindo estilo e funcionalidade. Os apoios de cabeça e lombar removíveis oferecem suporte extra nas áreas mais críticas, tornando-a uma excelente opção para quem passa muitas horas sentado.",  
      valor:300.00, quantidade:7, keywords:"Cadeira, Cadeiras, Gamer", destaque:0
    },
    
    {codigo:3, nome:"Cartas Magic", descritivo:"Kit inicial com dois decks prontos para jogo", 
      descritivoCompleto:"O Kit Inicial de Magic: The Gathering é a escolha perfeita para jogadores novos e aqueles que desejam aprimorar suas habilidades no lendário jogo de cartas colecionáveis. Desenvolvido especialmente para iniciantes, o kit contém tudo o que é necessário para começar a jogar de forma rápida e fácil, oferecendo uma introdução ao mundo estratégico de Magic, onde habilidades, planejamento e estratégia são fundamentais para derrotar o oponente. Esse kit vem com dois decks prontos para jogar, ideal para dois jogadores, permitindo que você comece a diversão imediatamente. Além disso, é a porta de entrada para explorar as inúmeras combinações de cartas, habilidades e mecânicas que fazem de Magic: The Gathering um dos jogos mais amados do mundo.",
      valor:60.00, quantidade:4, keywords:"Carta, Cartas, Coleção, Geek, Magic, Cartas Magic", destaque:0
    },
    
    {codigo:4, nome:"Playstation 4", descritivo:"Modelo Slim com 500GB com leitor", 
      descritivoCompleto:"O PlayStation 4, popularmente conhecido como PS4, é um dos consoles mais icônicos da Sony, oferecendo uma experiência de jogo imersiva com gráficos de alta qualidade, desempenho poderoso e uma ampla biblioteca de jogos. Desde seu lançamento, o PS4 se tornou o console de escolha para milhões de jogadores ao redor do mundo, devido à sua combinação de hardware avançado, jogos exclusivos e funcionalidades online robustas. O design elegante e minimalista do PS4 o torna um complemento perfeito para qualquer configuração de entretenimento, enquanto seus recursos integrados, como armazenamento expansível, conectividade online e suporte a mídia, oferecem muito mais do que apenas jogos.",
      valor:3300.00, quantidade:20, keywords:"Consoles, Console, Videogame, Playstation", destaque:0
    },
    
    {codigo:5, nome:"Dualshock 4", descritivo:"Controle Dualshock 4 sem fio",
      descritivoCompleto:"O DualShock 4, o controle oficial do PlayStation 4 (PS4), é uma peça fundamental para a experiência de jogo no console, trazendo uma série de melhorias em relação aos seus antecessores. Com um design ergonômico, recursos inovadores e uma precisão refinada, o DualShock 4 proporciona um controle mais intuitivo e imersivo para os jogadores. Seja em jogos de ação, esportes, aventuras ou shooters, este controle oferece uma resposta rápida e precisa para cada comando, proporcionando uma experiência de jogo superior. Além dos botões tradicionais, o DualShock 4 conta com uma variedade de recursos avançados, como o touchpad sensível ao toque, iluminação LED integrada e um botão de compartilhamento, permitindo que os jogadores capturem e compartilhem suas aventuras com facilidade.",
      valor:299.00, quantidade:30, keywords:"Controle, Controles, Videogame, Playstation", destaque:0
    },
    
    {codigo:6, nome:"HeadSet ReDragon", descritivo:"HeadSet ReDragon RGB, Auriculares confortáveis e ajustáveis",
      descritivoCompleto:"O Headset Redragon é projetado para jogadores que buscam uma experiência de áudio imersiva e precisa, seja em jogos de ação, e-sports ou qualquer outro tipo de entretenimento digital. Conhecida por seu excelente custo-benefício e qualidade, a Redragon desenvolveu este headset com atenção especial ao conforto e à performance sonora. Com um design robusto e confortável, microfone flexível e drivers de alta qualidade, este headset proporciona um som nítido e potente, além de comunicação clara para uma experiência de jogo mais imersiva e eficaz.",
      valor:210.00, quantidade:10, keywords:"HeadSets, HeadSet, fone de ouvido, videogame, Videogame", destaque:0
    },
    
    {codigo:7, nome:"God of War: Ragnarok", descritivo:"Mídia Física para ps4",
      descritivoCompleto:"God of War: Ragnarok é a tão aguardada sequência do premiado God of War (2018), desenvolvido pela Santa Monica Studio e publicado pela Sony Interactive Entertainment. Lançado exclusivamente para o PlayStation 4 e PlayStation 5, o jogo dá continuidade à saga de Kratos e seu filho Atreus, enquanto enfrentam novos desafios no mundo da mitologia nórdica. Neste título épico, Kratos e Atreus embarcam em uma jornada perigosa para prevenir o Ragnarök – o apocalipse previsto na mitologia nórdica. O jogo explora temas profundos como destino, sacrifício e a complexidade das relações entre pais e filhos, mantendo a jogabilidade visceral e cinematográfica que fez do jogo anterior um sucesso estrondoso.",
      valor:190.00, quantidade:15, keywords:"jogo, playstation, Videogame", destaque:0
    },
    
    {codigo:8, nome:"Microfone Externo", descritivo:"Microfone Externo com entrada P2 e configurações via Bluetooth",
      descritivoCompleto:"O Microfone Externo Condensador Cardioide é projetado para capturar áudio com alta qualidade e precisão, sendo ideal para uma ampla variedade de aplicações, desde gravação de voz para streaming, podcasts, gravações musicais ou até mesmo entrevistas e vlogs. Com um padrão polar cardioide, este microfone minimiza ruídos indesejados ao redor, focando na captura do som que vem diretamente à sua frente.",
      valor:300.00, quantidade:5, keywords:"microfone, computador, gamer", destaque:0
    },
    
    {codigo:9, nome:"Monitor SharkBlade", descritivo:"Monitor curvado 165hz com imersão",
      descritivoCompleto:"O Monitor Gamer SharkBlade é projetado para jogadores que buscam uma experiência de jogo imersiva e de alto desempenho. Com uma taxa de atualização rápida, tempos de resposta baixos e resolução de alta definição, ele oferece imagens nítidas e fluídas, garantindo que cada detalhe do jogo seja capturado com precisão. Este monitor é ideal tanto para competições de eSports quanto para uma jogatina casual, oferecendo uma vantagem competitiva com seus recursos avançados.",
      valor:1000.00, quantidade:8, keywords:"monitor,computador,gamer, Videogame", destaque:0
    },
    
    {codigo:10, nome:"Mouse Gamer", descritivo:"Mouse Fortrek com RGB com 1000dpi",
      descritivoCompleto:"O Mouse Gamer é uma ferramenta essencial para jogadores que buscam precisão, conforto e desempenho superior em suas partidas. Projetado para atender às exigências dos jogos modernos, este mouse oferece uma combinação de alta sensibilidade, ergonomia aprimorada e recursos personalizáveis, permitindo que os jogadores tenham uma vantagem competitiva em qualquer gênero, desde FPS até MOBA.",
      valor:90.00, quantidade:18, keywords:"mouse, gamer, computador, Videogame", destaque:0
    },
    
    {codigo:11, nome:"MousePad", descritivo:"MousePad roxo, Abyss",
      descritivoCompleto:"O Mousepad Gamer é um acessório essencial para qualquer jogador que busca melhorar a precisão e a suavidade do movimento do mouse durante as sessões de jogo. Projetado para proporcionar uma superfície ideal para diversos tipos de sensores de mouse, este mousepad oferece uma combinação de conforto, controle e durabilidade, aprimorando a experiência de jogo.",
      valor:70.00, quantidade:8, keywords:"mouse, mousepad, Videogame", destaque:0
    },
    {codigo:12, nome:"Suporte De Controles", descritivo:"Suporte para controles com temática do filme Deadpool x Wolverine para Xbox, PS4, PS5 e Switch",
      descritivoCompleto:"O Suporte de Controle Temático Deadpool x Wolverine é uma peça de decoração funcional que combina estilo e praticidade para os fãs de videogames e cultura pop. Projetado para exibir e organizar controles de consoles de maneira atraente, este suporte não só mantém seus dispositivos seguros, mas também traz um toque vibrante e divertido para seu espaço de jogo.",
      valor:50.00, quantidade:5, keywords:"Controles, suporte, Videogame", destaque:0
    },

    {codigo:13, nome:"Tabuleiro WAR", descritivo:"Tabuleiro para brincar de senhor da guerra, dispute território com seus amigos, faça alianças etc.",
      descritivoCompleto:"O Tabuleiro WAR é um clássico jogo de estratégia que desafia os jogadores a conquistarem territórios e dominarem o mundo através de táticas, alianças e confrontos. Com uma combinação de planejamento estratégico e sorte, WAR proporciona uma experiência envolvente para amigos e familiares, tornando-se um destaque em noites de jogos.",
      valor:110.00, quantidade:10, keywords:"jogo, tabuleiro", destaque:0
    },

    {codigo:14, nome:"Teclado Mecânico", descritivo:"Teclado Mecânico Gamer RGB com entrada tipoC ",
      descritivoCompleto:"O Teclado Mecânico é uma ferramenta essencial para gamers, programadores e usuários que buscam desempenho superior e uma experiência de digitação aprimorada. Com teclas individuais que utilizam switches mecânicos, este teclado oferece precisão, durabilidade e feedback tátil, tornando-o a escolha favorita entre os entusiastas de tecnologia.",
      valor:120.00, quantidade:7, keywords:"Computador, jogo, Videogame", destaque:0
    }


  ];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filtro = params['q'] || '';
    });
  }
    public verDetalhe(item:Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhe";  
  }

  public adicionarItem(obj:Produto){
    let json = localStorage.getItem("cesta");
    let jsonCliente = localStorage.getItem("cliente");
    let cesta: Cesta = new Cesta();
    let item: Item = new Item();
    if(json==null){      //CESTA NAO EXISTE     
        item.codigo=obj.codigo;
        item.produto=obj;
        item.quantidade=1;
        item.valor= obj.valor;          
        cesta.codigo = 1;
        cesta.total = obj.valor;
        cesta.itens.push(item);          
        if(jsonCliente!=null) cesta.cliente = JSON.parse(jsonCliente);          
    } else {  //CESTA EXISTE
      let achou = false;
      cesta = JSON.parse(json);
      for(let i=0; i<cesta.itens.length; i++){
        if(cesta.itens[i].codigo==obj.codigo){  //ITEM JA EXISTE
          cesta.itens[i].quantidade = cesta.itens[i].quantidade + 1;
          cesta.itens[i].valor =  cesta.itens[i].quantidade * cesta.itens[i].produto.valor;
          achou = true;
          break;
        }            
      }
      if(!achou){  //ITEM NAO EXISTE
        item.codigo=obj.codigo;
        item.produto=obj;
        item.quantidade=1;
        item.valor= obj.valor;    
        cesta.itens.push(item);      
      }
    }

    cesta.total = 0; //ATUALIZA O VALOR TOTAL DA CESTA
    for(let i=0; i<cesta.itens.length; i++){
      cesta.total= cesta.itens[i].valor + cesta.total;
    }

    localStorage.setItem("cesta", JSON.stringify(cesta));
    window.location.href = "./cesta";
}




}

