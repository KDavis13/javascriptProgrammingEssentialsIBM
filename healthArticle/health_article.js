var xhr = new XMLHttpRequest();
var url = './health_article.json';

xhr.open('GET', url, true);
xhr.responseType = 'json';

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    // Si el navegador no rellena xhr.response (depende del MIME), parsea texto:
    var data = xhr.response || JSON.parse(xhr.responseText);

    // El JSON puede ser { "articles": [...] } o directamente [...]
    var articles = Array.isArray(data) ? data : data.articles;

    if (!Array.isArray(articles)) {
      console.error('Formato JSON inesperado. Esperaba un array "articles".', data);
      return;
    }

    var articlesDiv = document.getElementById('articles');
    if (!articlesDiv) {
      console.error('No existe el contenedor #articles en el DOM.');
      return;
    }

    articles.forEach(function(article) {
      var articleDiv = document.createElement('div');
      articleDiv.classList.add('article');

      var title = document.createElement('h2');
      title.textContent = article.title || '';

      var description = document.createElement('p');
      description.textContent = article.description || '';

      var waysHeader = document.createElement('h3');
      waysHeader.textContent = 'Ways to Achieve:';

      var waysList = document.createElement('ul');
      (article.ways_to_achieve || []).forEach(function(way) {
        var li = document.createElement('li');
        li.textContent = way;
        waysList.appendChild(li);
      });

      var benefitsHeader = document.createElement('h3');
      benefitsHeader.textContent = 'Benefits:';

      var benefitsList = document.createElement('ul');
      (article.benefits || []).forEach(function(benefit) {
        var li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
      });

      articleDiv.appendChild(title);
      articleDiv.appendChild(description);
      articleDiv.appendChild(waysHeader);
      articleDiv.appendChild(waysList);
      articleDiv.appendChild(benefitsHeader);
      articleDiv.appendChild(benefitsList);

      articlesDiv.appendChild(articleDiv);
    });
  } else {
    console.error('Error HTTP', xhr.status, xhr.statusText);
  }
};

xhr.onerror = function () {
  console.error('Fallo de red/carga del JSON.');
};

xhr.send();