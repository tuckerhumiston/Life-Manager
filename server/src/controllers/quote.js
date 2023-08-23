
exports.getQuote = async (req, res) => {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const { statusCode, statusMessage, ...data } = await response.json();
        if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);

        res.status(200).json(data);

    } catch (error) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while finding a quote" });
    }
};
