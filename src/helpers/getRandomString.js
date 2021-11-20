const getRandomString = () => {
    // declaring all the words
    const words = ['Awesome', 'Apocalyptic', 'Bamboozled', 'Bizarre', 'Blasphemy', 'BumbleBee', 'Capricious', 'Clandestine', 'Cognizant', 'Conundrum', 'Corrosion', 'Crestfallen', 'Dastardly', 'Diabolical', 'Dwindling', 'Effervescent', 'Exquisite', 'Flippant', 'Gerrymandering', 'Hyperbolic', 'Incognito', 'Indigo', 'Insidious', 'Kaleidoscopic', 'Luminescent', 'Mercurial', 'Nefarious', 'Picturesque', 'Pelbian', 'Quadrinomial', 'Rambunctious', 'Sanctimonious', 'Sinister', 'Synergistic', 'Technonic', 'Totalitarian', 'Trapezoid', 'Ubiquitous', 'Villainous', 'Whimsical', 'Wizardy', 'ZigZag'];

    //generating a random index value to pick a random word from the above array
    const index = Math.floor(Math.random() * (words.length + 1))
    const word = `${words[index]} Code`

    return (word)
}

export default getRandomString