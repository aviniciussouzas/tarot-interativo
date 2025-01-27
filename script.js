const cardsData = [
    { 
      id: 'O Espelho do Tempo', 
      image: 'images/card1.png',
      text: 'Reflexão interna: Um convite para olhar além das comparações externas e compreender sua singularidade.',
      ritual: 'Encontre um espelho pequeno e um copo com água limpa, Coloque o espelho atrás do copo e posicione-se de forma que consiga observar o reflexo da água no espelho mentalizando essa pergunta: Qual é o reflexo que vejo de mim?'
    },
{
    id: 'A Serpente das Águas', 
    image: 'images/card2.png',
    text: 'Reflexão interna: Quais emoções ou situações estão pedindo renovação em sua vida agora?',
    ritual: 'Conecte-se com a água (um banho de rio, mar ou mesmo de chuveiro) para simbolizar limpeza e renovação emocional.'
},
{ 
    id: 'O Guardião do Silêncio', 
    image: 'images/card3.png',
    text: 'Reflexão interna: O que em você precisa ser protegido e resguardado neste momento?',
    ritual: 'Tire um momento de silêncio hoje para escutar seus pensamentos mais profundos. Anote o que emergir.'
},
{
    id: 'A Festa Eterna', 
    image: 'images/card4.png',
    text: 'Reflexão interna: Você tem celebrado as pequenas e grandes conquistas da vida? O que o impede de se conectar com o momento presente?',
    ritual: 'Escolha uma música que o faça sentir-se vivo e permita-se dançar ou se mover livremente, mesmo que esteja sozinho. Conecte-se com a energia da celebração.'
},
{
    id: 'A Chama Interior', 
    image: 'images/card5.png',
    text: 'Reflexão interna: O que faz sua chama brilhar mais intensamente? Quais hábitos ou sentimentos estão abafando sua luz?',
    ritual: 'Acenda uma vela e medite na luz dela, visualizando-a como sua própria energia vital. Observe como a chama dança e brilha, conectando-se com sua força interior.'     
},
{ 
    id: 'A Ponte Invisível', 
    image: 'images/card6.png',
    text: 'Reflexão interna: Qual travessia invisível você está sendo chamado a fazer neste momento?',
    ritual: 'Faça algo hoje que pareça arriscado, mas essencial para sua jornada.'
},
{
    id: 'O Horizonte Oculto', 
    image: 'images/card7.png',
    text: 'Reflexão interna: O que você teme deixar para trás ao caminhar em direção ao desconhecido? Que tesouro pode estar oculto além da linha visível?',
    ritual: 'Dê uma caminhada ao amanhecer ou entardecer, observando o horizonte. Imagine-se atravessando a linha que separa o conhecido do desconhecido e pense nas possibilidades que esperam por você.'
},
{ 
    id: 'A Casa da Névoa', 
    image: 'images/card8.png',
    text: 'Reflexão interna: O que você teme encontrar ao atravessar a névoa? Pode haver algo valioso esperando do outro lado.',
    ritual: 'Tire um momento para meditar em um espaço silencioso e visualize-se entrando na casa da névoa. Explore o que ela guarda sem pressa.'
},
{
    id: 'A Vitória das Águas', 
    image: 'images/card9.png',
    text: 'Reflexão interna: De que maneira você tem permitido que suas emoções fluam? Que vitórias pessoais você alcançou ao abraçar as mudanças e a fluidez da vida?',
    ritual: 'Passe um tempo perto de uma fonte de água (mar, rio ou até uma taça com água em casa) e reflita sobre as mudanças que moldaram quem você é hoje.'
},
{
    id: 'O Labirinto do Eu', 
    image: 'images/card10.png',
    text: 'Reflexão interna: Quais caminhos internos você tem evitado percorrer? O que o espelho de sua verdade está lhe mostrando, mesmo que você ainda não tenha reconhecido?',
    ritual:'Reserve um tempo para meditar ou escrever sobre uma questão que o inquieta. Imagine-se caminhando por um labirinto e visualize o que encontra no centro.'
}




    // ... (mantenha os outros objetos do array com a mesma estrutura)
  ];
  
  const gameBoard = document.getElementById('game-board');
  const modal = document.getElementById('modal');
  const modalCard = document.getElementById('modal-card');
  const modalText = document.querySelector('.modal-text');
  const closeModal = document.getElementById('close-modal');
  
  // Função para criar cartas
  function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.id = card.id;
    
    cardElement.addEventListener('click', () => {
      document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
      cardElement.classList.add('selected');
      
      // Carregar dados no modal
      modalCard.style.backgroundImage = `url('${card.image}')`;
      modalText.innerHTML = `
        <h3>${card.id}</h3>
        <p>${card.text}</p>
        <p class="ritual">🕯️ ${card.ritual}</p>
      `;
      
      modal.classList.add('show');
    });
    
    return cardElement;
  }
  
  // Fechar modal
  function closeModalFunc() {
    modal.classList.remove('show');
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
  }
  
  // Event listeners
  closeModal.addEventListener('click', closeModalFunc);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModalFunc();
  });
  
  // Embaralhar cartas
  document.getElementById('shuffle-btn').addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-20px)';
    });
  
    setTimeout(() => {
      for (let i = cardsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsData[i], cardsData[j]] = [cardsData[j], cardsData[i]];
      }
      renderCards();
    }, 300);
  });
  
  // Renderizar cartas
  function renderCards() {
    gameBoard.innerHTML = '';
    cardsData.forEach((card, index) => {
      setTimeout(() => {
        const cardElement = createCardElement(card);
        gameBoard.appendChild(cardElement);
        setTimeout(() => cardElement.classList.add('visible'), 10);
      }, index * 50);
    });

    const audio = document.getElementById('ambient');
    document.getElementById('music-btn').addEventListener('click', () => {
      audio.paused ? audio.play() : audio.pause();
    });
  }
  
  // Inicialização
  renderCards();
