(function (ns) {

    /**********************************************************
    **********************************************************/
    var RMRGame = function () {

    }

    //-------------------------------------------------------------------
    //PROPERTIES
    //-------------------------------------------------------------------
    var p = RMRGame.prototype;

    /**********************************************************
    setting for loading manifests , a array of resource path
    ["assets/uiMap.png","assets/uiMap.txt","assets/dockFill.png"]
    **********************************************************/
    p.gameWorld = null;
    p.heroBody = null;
    p.bindDist = 0;
    p.plateSetA = null;
    p.plateSetB = null;
    p.lastAWidth = 0;
    p.lastBWidth = 0;

    p.initialize = function () {

        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = .5;
        fixDef.restitution = 0;
        var bodyDef = new b2BodyDef;
        bodyDef.fixedRotation = true;
        bodyDef.type = b2Body.b2_dynamicBody;
        //create box shape
        fixDef.shape = new b2PolygonShape;
        var rect = BoxUtil.topLeftToCeterRect(150, 20, 32, 32);
        fixDef.shape.SetAsBox(rect.w, rect.h);
        bodyDef.position.Set(rect.x, rect.y);
        this.heroBody = BoxUtil.gameWorld.world.CreateBody(bodyDef);
        this.heroBody.CreateFixture(fixDef);

        this.plateSetA = { "x": 0 };
        this.plateSetB = { "x": 900 };
        this.plateSetA.list = this.addPlatforms(0);
        this.plateSetB.list = this.addPlatforms(900);
    }

    p.addPlatforms = function (offsetX) {
        //----------------------------------------------------------------------------
        var platList = [];
        var addWidth = 0;
        var boxA;
        for (var s = 0; s < 2; s++) {
            var rw = Math.round(Math.random() * 200 + 200);
            var ry = Math.round(Math.random() * 200 - 100) + 250;
            if (ry > 320) ry = 320;
            boxA = BoxUtil.makeBox(offsetX+addWidth, ry, rw, 500, true);
            addWidth += rw;
            platList.push({ "body": boxA, "w": rw, "h": 500 });
        }
        var lastW = 900 - addWidth;
        if (offsetX == 0) {
            this.lastAWidth = -(lastW / 30) * .5;
        } else {
            this.lastBWidth = -(lastW / 30) * .5;
        }
        var ry = Math.round(Math.random() * 200 - 100) + 250;
        boxA = BoxUtil.makeBox(offsetX+addWidth, ry, lastW, 500, true);
        platList.push({ "body": boxA, "w": lastW, "h": 500 });
        return platList;
        //----------------------------------------------------------------------------

    }

    p.update = function () {
        for (var s = 0; s < 3; s++) {

            var posA = this.plateSetA.list[s].body.GetPosition();
            this.plateSetA.list[s].body.SetPosition(new b2Vec2(posA.x - .2, posA.y));
            
            var posB = this.plateSetB.list[s].body.GetPosition();
            this.plateSetB.list[s].body.SetPosition(new b2Vec2(posB.x - .2, posB.y));

            if (s == 2) {

                if (posA.x < this.lastAWidth) {
                    for (var q = 0; q < 3; q++) {
                        var posQ = this.plateSetA.list[q].body.GetPosition();
                        var ry = Math.round(Math.random() * 200 ) + 350;
                        this.plateSetA.list[q].body.SetPosition(new b2Vec2(posQ.x + 60, ry / 30));
                    }
                }

                if (posB.x < this.lastBWidth) {
                    for (var q = 0; q < 3; q++) {
                        var posQ = this.plateSetB.list[q].body.GetPosition();
                        var ry = Math.round(Math.random() * 200) + 350;
                        this.plateSetB.list[q].body.SetPosition(new b2Vec2(posQ.x + 60, ry / 30));
                    }
                }

            }

        }
    }

    p.jump = function () {
        this.heroBody.ApplyImpulse(new b2Vec2(0, -6), this.heroBody.GetWorldCenter());
    }

    ns.RMRGame = RMRGame;
}(gamejs || (gamejs = {})));
var gamejs;