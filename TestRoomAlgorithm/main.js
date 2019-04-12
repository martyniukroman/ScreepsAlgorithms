var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSolder = require('role.solder');

module.exports.loop = function () {
    var number = Math.floor(Math.random() * 2);

    if (Game.time % 10 == 0) {
        console.log('Energy:' + Game.spawns['Spawn1'].energy);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
        var solders = _.filter(Game.creeps, (creep) => creep.memory.role == 'solder');
        console.log('Solders: ' + solders.length);

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        if (solders.length < 5) {
            Game.spawns['Spawn1'].createCreep([ATTACK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'solder',
                sourceNumber: number
            });
        }
        if (upgraders.length < 3) {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'upgrader',
                sourceNumber: number
            });
        }
        if (builders.length < 10) {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'builder',
                sourceNumber: number
            });
        }
        if (harvesters.length < 5) {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'harvester',
                sourceNumber: number
            });
        }

        console.log('------------------------');

    }

    var tower = Game.getObjectById('TOWER_ID');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'solder') {
            roleSolder.run(creep);
        }
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}