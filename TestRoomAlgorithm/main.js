var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSolder = require('role.solder');

module.exports.loop = function () {
    var numberRand = Math.floor(Math.random() * 2);

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

        var allcreeps = _.filter(Game.creeps);
        console.log('All creeps: ' + allcreeps.length);
        
        if(allcreeps.length < 5){
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], "harvester-"  + Game.time, {
                role: 'harvester',
                sourceNumber: numberRand
            });
        }

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        var constructions = allcreeps[0].room.find(FIND_CONSTRUCTION_SITES);
       // [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        if (solders.length < 3 && constructions.length == 0) {
            Game.spawns['Spawn1'].createCreep([ATTACK, ATTACK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], "solder-"  + Game.time, {
                role: 'solder',
                sourceNumber: numberRand
            });
        }
        if (upgraders.length < 3) {
            Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], "upgrader-"  + Game.time, {
                role: 'upgrader',
                sourceNumber: numberRand
            });
        }
        if (builders.length < 3) {
            Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], "builder-"  + Game.time, {
                role: 'builder',
                sourceNumber: numberRand
            });
        }
        if (harvesters.length < 5) {
            Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], "harvester-"  + Game.time, {
                role: 'harvester',
                sourceNumber: numberRand
            });
        }

        console.log('------------------------');

    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var sources = creep.room.find(FIND_SOURCES);
        
        if (sources[creep.memory.sourceNumber].energy == 0) {
            creep.memory.sourceNumber = numberRand;
        }
        
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
//     var towers = creep.room.find(FIND_STRUCTURES, { filter: (structure) => 
//     { return structure.structureType == STRUCTURE_TOWER }});
    
//     for(var tower in towers){
//         console.log('tower' + tower);
//         if (tower) {
//             var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//             if (closestHostile) {
//                 tower.attack(closestHostile);
//                 return;
//             }
//             var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
//                 filter: (structure) => structure.hits < structure.hitsMax
//             });
//             if (closestDamagedStructure) {
//                 tower.repair(closestDamagedStructure);
//             }
//         }
//   }

   var tower = Game.getObjectById('5cb590c992df111cb6ef2631');
    if (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
            return;
        }
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }
    
}