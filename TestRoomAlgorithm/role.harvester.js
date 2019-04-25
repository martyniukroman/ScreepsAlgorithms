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
        
        if(!creep.memory.harvesting) {
            
            var energy = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
            if (energy.length) {
               if(creep.pickup(energy[0])){
                    creep.moveTo(energy[0], {visualizePathStyle: {stroke: '#ffffff'}});
               };
            }
            else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[creep.memory.sourceNumber]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.sourceNumber], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else if(creep.memory.harvesting) {
                        
           var targetStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER || 
                            structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                targetStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
                    }
                });
            }
            
            if (targetStructure == undefined) {
                creep.memory.harvesting = false;
                creep.moveTo(6, 27);
            }

            if(creep.transfer(targetStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleHarvester;