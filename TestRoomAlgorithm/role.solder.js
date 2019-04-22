var roleSolder = {
    run: function (creep) {
        var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        if (hostile && creep.energy >= creep.carryCapacity * 2) {
            if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostile);
            }
        }
        else if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.sourceNumber]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceNumber], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            creep.moveTo(20, 30);
        }
    }
};
module.exports = roleSolder;