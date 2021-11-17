

// *** .get requests *** (event loop)
app.get('/api/v1/characters', (req, res) => {
    // send back all characters
    res.status(200).json({
        status: 'success',
        results: characters.length,
        data: {
            characters: characters
        }
    })
})