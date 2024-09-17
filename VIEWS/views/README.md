Link to the website:
https://sudeepti25.github.io/Ridehack/
 <div class="container">
        <% people.forEach(function(i){ %>
            <div class="box">
                <h2><%= i.name %></h2>
                <p><%= i.skills %></p>
                <button onclick="handleclick('<%= i.id%>')" type="button">View More</button>
            </div>
            
       <% }); %>
       
    </div>
   