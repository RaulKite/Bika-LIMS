from AccessControl import ClassSecurityInfo
from Products.Archetypes.public import *
from Products.CMFCore.permissions import View, ModifyPortalContent
from bika.lims.content.bikaschema import BikaSchema
from bika.lims.config import PROJECTNAME
from bika.lims import bikaMessageFactory as _
from zope.interface import implements

schema = BikaSchema.copy()

schema['description'].schemata = 'default'
schema['description'].widget.visible = True

class ReferenceManufacturer(BaseContent):
    security = ClassSecurityInfo()
    displayContentsTab = False
    schema = schema

    _at_rename_after_creation = True
    def _renameAfterCreation(self, check_auto_id=False):
        from bika.lims.idserver import renameAfterCreation
        renameAfterCreation(self)

registerType(ReferenceManufacturer, PROJECTNAME)
