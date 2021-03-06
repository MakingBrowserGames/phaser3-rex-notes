import ContainerLite from './gameobjects/containerlite/ContainerLite.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexContainerLite', function (x, y, width, height) {
    return this.displayList.add(new ContainerLite(this.scene, x, y, width, height));
});
Phaser.GameObjects.GameObjectCreator.register('rexContainerLite', function (config) {       
    var width = GetAdvancedValue(config, 'width', 1);
    var height = GetAdvancedValue(config, 'height', width);
    var container = new ContainerLite(this.scene, 0, 0, width, height);

    // set properties wo modify children
    container.syncChildrenEnable = false;    
    BuildGameObject(this.scene, container, config);
    // sync properties of children
    container.syncChildrenEnable = true;
    container.syncPosition().syncVisible().syncAlpha();

    return container;
});

export default ContainerLite;