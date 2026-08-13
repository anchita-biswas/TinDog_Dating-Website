// Mock Data for Dogs
const dogs = [
  {
    name: "Rex",
    age: 3,
    breed: "German Shepherd",
    img: "https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bella",
    age: 2,
    breed: "Golden Retriever",
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Max",
    age: 4,
    breed: "Husky",
    img: "https://images.unsplash.com/photo-1605568420105-ce2a31c73301?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Pebbles",
    age: 1,
    breed: "Corgi",
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

const cardStack = document.getElementById("card-stack");

// 1. Render Cards
function renderCards() {
  // Reverse the array so the first dog renders on top of the DOM stack
  [...dogs].reverse().forEach((dog, index) => {
    const card = document.createElement("div");
    card.classList.add("tindog-card");
    card.innerHTML = `
            <img src="${dog.img}" alt="${dog.name}">
            <div class="card-info">
                <h3>${dog.name}, ${dog.age}</h3>
                <p>${dog.breed}</p>
            </div>
        `;
    cardStack.appendChild(card);
  });
  initCards();
}

// 2. Add Swipe Logic to the Top Card
function initCards() {
  const cards = document.querySelectorAll(".tindog-card");
  if (cards.length === 0) {
    cardStack.innerHTML = '<p style="margin-top:50%;">No more dogs nearby!</p>';
    return;
  }

  const topCard = cards[cards.length - 1]; // The last element in DOM is visually on top
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  // Pointer events work for both mouse and touch
  topCard.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    topCard.style.transition = "none"; // Remove transition so it follows finger exactly
  });

  document.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    // Rotate slightly as it drags
    const rotate = currentX * 0.05;
    topCard.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
  });

  document.addEventListener("pointerup", () => {
    if (!isDragging) return;
    isDragging = false;
    topCard.style.transition = "transform 0.3s ease-out";

    // If swiped far enough, remove it
    if (Math.abs(currentX) > 100) {
      const direction = currentX > 0 ? 1 : -1;
      topCard.style.transform = `translateX(${direction * 1000}px) rotate(${direction * 30}deg)`;
      setTimeout(() => {
        topCard.remove();
        initCards(); // Attach logic to the new top card
      }, 300);
    } else {
      // Snap back to center
      topCard.style.transform = "translateX(0px) rotate(0deg)";
    }
    currentX = 0;
  });
}

// Button Logic
document
  .getElementById("btn-pass")
  .addEventListener("click", () => swipeCard(-1));
document
  .getElementById("btn-like")
  .addEventListener("click", () => swipeCard(1));

function swipeCard(direction) {
  const cards = document.querySelectorAll(".tindog-card");
  if (cards.length === 0) return;
  const topCard = cards[cards.length - 1];

  topCard.style.transition = "transform 0.4s ease-out";
  topCard.style.transform = `translateX(${direction * 1000}px) rotate(${direction * 30}deg)`;

  setTimeout(() => {
    topCard.remove();
    initCards();
  }, 400);
}

// Initialize the app
renderCards();
