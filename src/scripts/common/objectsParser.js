function normalizeActorCoordinates (x, y) {
  return { x: x + 8, y: y + 24 };
}

function normalizeGoalCoordinates (x, y) {
  return { x: x + 16, y: y + 16 };
}

function normalizeTrapCoordinates (x, y) {
  return { x: x, y: y - 8 };
}

function makeActorPosition ({ x, y, name }) {
  switch(name) {
    case 'heart':
    case 'star':
      return normalizeActorCoordinates(x, y);

    case 'goal':
      return normalizeGoalCoordinates(x, y);
  }
}

function makeTrap ({ x, y, properties: { affects, orientation } }) {
  return {
    position: normalizeTrapCoordinates(x, y),
    affects, orientation
  };
}

function makePlatform ({ x, y, properties: { affects, type }}) {
  return { position: { x, y }, affects, type };
}

export default function objectsParser (mapObjects) {
  var objects = {
    traps: [],
    actors: {},
    platforms: [],
    miscellaneousObjects: []
  };

  for (var object of mapObjects) {
    switch (object.type) {
      case 'trap':
        objects['traps'].push(makeTrap(object));
        break;

      case 'position':
        objects['actors'][object.name] = makeActorPosition(object);
        break;

      case 'platform':
        objects['platforms'].push(makePlatform(object));
        break;
    }
  }

  return objects;
}
