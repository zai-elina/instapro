import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, userPosts, goToPage } from "../index.js";

function showLikes(likes) {
  if (likes.length === 0) {
    return "0";
  }
  if (likes.length === 1) {
    return `${likes[0].name}`;
  }
  return `${likes[0].name} и ещё ${likes.length - 1}`;
}

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  let postsHtml = posts
    .map((item) => {
      return `
    <li class="post">
      <div class="post-header" data-user-id="${item.user.id}">
          <img src="${item.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${item.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${item.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${item.id}" class="like-button">
          <img src="./assets/images/like-active.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${showLikes(item.likes)}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${item.user.name}</span>
        ${item.description}
      </p>
      <p class="post-date">
        ${item.createdAt}
      </p>
    </li>
    `;
    })
    .join("");
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts center">
                  ${postsHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

export function renderUserPostsPageComponent({ appEl }) {
  let userPostsHtml = userPosts
    .map((item) => {
      return `  
    <li class="post">
      <div class="post-image-container">
        <img class="post-image" src="${item.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${item.id}" class="like-button">
          <img src="./assets/images/like-active.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${showLikes(item.likes)}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${item.user.name}</span>
        ${item.description}
      </p>
      <p class="post-date">
        ${item.createdAt}
      </p>
    </li>
    `;
    })
    .join("");
  
  let userName = userPosts[0]?.user.name;
  let userImage = userPosts[0]?.user.imageUrl;
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                </div>
                <div class="posts-user-header">
                    <img src="${userImage}" class="posts-user-header__user-image">
                    <p class="posts-user-header__user-name">${userName}</p>
                </div>
                <ul class="posts posts-user">
                  ${userPostsHtml}
                </ul>
              `;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
}
