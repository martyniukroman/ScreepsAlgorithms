var roleSolder = {
    run: function (creep) {
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS)
        if (hostiles > 0 && creep.carry.energy > 25) {
            if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostiles[0]);
            }
        }
        else if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.sourceNumber]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceNumber], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            creep.moveBy(20, 29);
        }
    }
};
module.exports = roleSolder;