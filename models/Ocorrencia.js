/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let Ocorrencia =  sequelize.define('Ocorrencia', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'imagem': {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: 'no_image.png',
      comment: "null"
    },
    'descricao': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'endereco': {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "null"
    },
    'bairro': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'usuarios_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    'status_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1',
      comment: "null",
      references: {
        model: 'Status',
        key: 'id'
      }
    },
    'cidades_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Cidade',
        key: 'id'
      }
    },
    'data_hora': {
      type: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true,
    }
  }, {
      tableName: 'ocorrencias',
      timestamps: false,
  });

  Ocorrencia.associate = (models) => {
    Ocorrencia.belongsTo(models.Cidade, { foreignKey: 'cidades_id', as:'cidade'});
    Ocorrencia.belongsTo(models.Status, { foreignKey: 'status_id', as:'status'});
  };

  return Ocorrencia;
};
