const apiKey = 'http://api.mediastack.com/v1/news?access_key=ab4277cca05fc279a2a7a843342492e2&sources=en';

fetch(apiKey)
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.length > 0) {
            const container = document.getElementById("newsContainer");

            data.data.forEach(newsItem => {
                // Create a new card for each news item
                const col = document.createElement('div');
                col.classList.add('col-lg-3', 'mb-4');

                const card = document.createElement('div');
                card.classList.add('card', 'shadow');

                // Add image
                const img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = newsItem.image || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
                img.alt = newsItem.title || "No Image Available";

                // Add card body
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                // Add heading
                const heading = document.createElement('h5');
                heading.classList.add('card-title');
                heading.textContent = newsItem.title || "No Title Available";

                // Add date
                const date = document.createElement('p');
                date.classList.add('card-text', 'text-muted');
                date.textContent = newsItem.published_at ? new Date(newsItem.published_at).toLocaleDateString() : "No Date Available";

                // Add description
                const description = document.createElement('p');
                description.classList.add('card-text');
                description.textContent = newsItem.description || "No Description Available";

                // Add "Read More" link
                const readMore = document.createElement('a');
                readMore.classList.add('btn', 'btn-primary');
                readMore.href = newsItem.url || "#";
                readMore.textContent = "Read More";

                // Append elements
                cardBody.appendChild(heading);
                cardBody.appendChild(date);
                cardBody.appendChild(description);
                cardBody.appendChild(readMore);

                card.appendChild(img);
                card.appendChild(cardBody);
                col.appendChild(card);

                container.appendChild(col);
            });
        } else {
            console.error('No news data available');
        }
    })
    .catch(error => console.error('Error fetching data:', error));
