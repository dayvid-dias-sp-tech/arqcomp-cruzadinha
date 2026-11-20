# Academia Arcana | Arquitetura Computacional

Jogo educativo desenvolvido em HTML, CSS e JavaScript puros para praticar conceitos de Arquitetura Computacional.

## Como jogar na Academia Arcana

O projeto possui três modalidades:

- **Cruzadinha:** selecione uma pista horizontal ou vertical para destacar a palavra no tabuleiro. Digite uma letra por casa; o foco avança automaticamente e as setas do teclado permitem navegar. O contador acompanha as palavras completas. Em **Conferir respostas**, as casas corretas e incorretas recebem cores diferentes; **Limpar tabuleiro** reinicia a prova.
- **Quiz:** responda às oito perguntas de múltipla escolha. O jogo apresenta o feedback de cada resposta e a pontuação final.
- **Forca:** descubra o conceito indicado pela dica usando o teclado na tela ou o teclado físico. São seis tentativas; a cada erro, uma parte do boneco é acrescentada ao desenho e permanece visível. **Novo encantamento** inicia outra palavra.

## Palavras e pistas da cruzadinha

| Nº | Palavra | Pista |
|---:|---|---|
| 1 | EEPROM | Memória não volátil que permite apagar e regravar eletricamente. |
| 2 | MICROCONTROLADOR | Circuito integrado que reúne processamento, memória e periféricos para controle. |
| 3 | DMA | Permite transferência de dados entre dispositivos e memória sem ocupar continuamente o processador. |
| 4 | REGISTRADORES | Armazenam temporariamente valores usados pelo processador. |
| 4 | RAM | Guarda dados e programas enquanto o computador está ligado. |
| 5 | QUADCORE | Processador que possui quatro núcleos de execução. |
| 6 | UC | Coordena e controla a execução das instruções. |
| 7 | DATABUS | Conjunto de linhas que transporta os valores entre componentes. |
| 8 | DUALCORE | Processador que possui dois núcleos de execução. |
| 9 | CPU | Componente central que executa instruções e coordena operações do computador. |
| 10 | FLASH | Tipo de memória não volátil usada em cartões e unidades de armazenamento. |
| 11 | CACHE | Memória pequena e rápida que reduz o tempo de acesso a dados frequentes. |
| 12 | ULA | Parte do processador responsável por operações matemáticas e lógicas. |
| 13 | ROM | Memória que mantém informações mesmo sem energia. |
| 14 | MEMORIADEMASSA | Armazena grande volume de dados de forma persistente. |
| 15 | ADDRESSBUS | Transporta a localização da informação que será acessada. |

As palavras que começam na mesma casa compartilham o mesmo número.

## Estrutura

- `index.html` — estrutura das telas e dos modos de jogo.
- `style.css` — estilos e layout responsivo.
- `script.js` — lógica da cruzadinha, quiz e forca.

## Executar localmente

Basta abrir o arquivo `index.html` em um navegador. Não é necessário instalar dependências ou iniciar um servidor.