const Carro = require('./carrosModel')

exports.getAllCarros = async (req, res) => {
    try {
        const carros = await Carro.findAll()

        res.status(200).json({
            status: 'success',
            message: 'Sucesso ao procurar todos os carros cadastrados.',
            data: carros
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: `Sem sucesso ao procurar todos os carros cadastrados: ${err}`
        })
    }
}

exports.getOneCarro = async (req, res) => {
    try {
        const carro = await Carro.findOne({ where: { id: req.params.id } })  // Mudado para findOne

        if (!carro) {
            return res.status(404).json({
                status: 'fail',
                message: 'Carro não encontrado'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Sucesso ao procurar o carro cadastrado.',
            data: carro
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: `Sem sucesso ao procurar o carro cadastrado: ${err}`
        })
    }
}

exports.createCarro = async (req, res) => {
    try {
        const carro = await Carro.create({
            modelo: req.body.modelo,
            marca: req.body.marca,
            ano: req.body.ano,
            cor: req.body.cor,
            numeroPortas: req.body.numeroPortas,
            quilometragem: req.body.quilometragem
        })

        res.status(201).json({
            status: 'success',
            message: 'Sucesso ao cadastrar carro',
            data: carro
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: `Sem sucesso para cadastrar carro: ${err}`
        })
    }
}

exports.updateCarro = async (req, res) => {
    try {
        console.log('teste se chegou')
        const resultado = await Carro.update({
            modelo: req.body.modelo,
            marca: req.body.marca,
            ano: req.body.ano,
            cor: req.body.cor,
            numeroPortas: req.body.numeroPortas,
            quilometragem: req.body.quilometragem
        }, {
            where: { id: req.params.id }
        })

        if (resultado[0] === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Carro não localizado'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Sucesso ao atualizar um carro'
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: `Sem sucesso para atualizar um carro: ${err}`
        })
    }
}

exports.deleteCarro = async (req, res) => {
    try {
        const resultado = await Carro.destroy({ where: { id: req.params.id } })

        if (resultado === 0) {
            return res.status(404).json({
                status: 'fail',
                message: `Erro ao excluir carro: Carro não encontrado`
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Carro apagado com sucesso.'
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: `Erro ao excluir carro: ${err}`
        })
    }
}
