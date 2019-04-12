var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
         if(creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
                creep.say('🔄 mine');
        }
        if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = true;
                    creep.say('♻️');
        }
        
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.sourceNumber]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceNumber], {visualizePathStyle: {stroke: '#ffffff'}});
                
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
                
            }
        }
    }
};

module.exports = roleHarvester;