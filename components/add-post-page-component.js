import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
    <div class="form">
        <h3 class="form-title">
         Добавить пост
          </h3>
        <div class="form-inputs">

            <div class="upload-image-container"></div>
            <label>Опишите фотографию:</label>
            <textarea class="input textarea" rows="4"></textarea>
            
            <div class="form-error"></div>
            
            <button class="button" id="add-button">Добавить</button>
        </div>
      
    </div>
</div> 
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });


    const descriptionInput = appEl.querySelector(".textarea");

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      descriptionInput.classList.remove("error");
      if (!descriptionInput.value) {
        descriptionInput.classList.add("error");
        return;
      }
      if(!imageUrl){
        alert("Выберите фото");
        return;
      }
      onAddPostClick({
        description: descriptionInput.value,
        imageUrl,
      });
    });
  };

  render();
}
