$('#get-user-btn').on('click', getUser)
$('#get-country-btn').on('click', getCountry)

async function getUser() {
    $('.user-data').empty()
    $('.country-data').empty()
    const result = await fetch('http://localhost:4000/api/users')
    const data = await result.json()
    for (let i of data) {
        const div = $('<div></div>').addClass('users').attr('id', i.user_id)
        const h3 = $('<h3></h3>').addClass('user-name').text(`Name: ${i.user_name}`)
        const p = $('<p></p>').addClass('user-age').text(`Age: ${i.user_age}`)
        div.append(h3)
        div.append(p)
        $('.user-data').append(div)
    }
}

async function getCountry() {
    $('.user-data').empty()
    $('.country-data').empty()
    const result = await fetch('http://localhost:4000/api/countries')
    const data = await result.json()
    for (let i of data) {
        const div = $('<div></div>').addClass('countries').attr('id', i.country_id)
        const h3 = $('<h3></h3>').addClass('country-name').text(`${i.country_name}`)
        div.append(h3)
        $('.country-data').append(div)
    }
}