const { Ocorrencia } = require('./../models');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
  
  save: async (req, res) => {
    try {
      
      //Usuário conectado
      let id = 1;
      let {
        descricao,
        endereco,
        bairro,
        cidades_id
      } = req.body;

      let { files } = req;

      let result = await Ocorrencia.create(
        {
          usuarios_id:id,
          descricao,
          endereco,
          bairro,
          cidades_id,
          imagem:files[0].filename
        }
      );

      res.send(result);

    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  },

  list: async (req, res) => {
    try {
      //Id do usuário conectado
      let id = 1;

      const currentDate = new Date();
      let dateStart = moment(currentDate).subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss');
      let dateEnd = moment(currentDate).add(1, 'day').format('YYYY-MM-DD hh:mm:ss');

      let { limit = 20, status = 1, start = dateStart, end = dateEnd, page=1 } = req.query;
      limit = parseInt(limit);
      page = parseInt(page - 1);
      let { count: size, rows: ocorrencias } = await Ocorrencia.findAndCountAll(
        {
          where: {
            usuarios_id: id,
            status_id: status,
            data_hora: { [Op.between]: [start, end] },
          },
          limit,
          offset:page * limit
        }
      );

      res.send({ size, ocorrencias });

    } catch (error) {
      console.log(error);
      res.send({ error: [{ msg: 'Erro' }] });
    }
  }
  
};