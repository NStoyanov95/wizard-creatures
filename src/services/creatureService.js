const Creature = require('../models/Creature');

exports.getAll = () => Creature.find();

exports.getOne = (creatureId) => Creature.findById(creatureId);

exports.create = (creatureData) => Creature.create(creatureData);

exports.vote = (creatureId, userId) => Creature.findByIdAndUpdate(creatureId, { $push: { votes: userId } });

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

exports.update = (creatureId, creatureData) => Creature.findByIdAndUpdate(creatureId, creatureData, { runValidators: true });

exports.getOneForUser = (userId) => Creature.find({owner: userId});