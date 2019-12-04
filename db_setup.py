import os
import sys

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class College(Base):
    __tablename__ = 'college'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
            }


class Lecture(Base):
    __tablename__ = 'lecture'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    professor = Column(String(120), nullable=False)
    description = Column(String(250))
    college_name = Column(String(250), ForeignKey('college.name'))
    college = relationship(College)

#    category_categories = Column(String(250), ForeignKey('category.categories'))
#    category = relationship(Category)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'name': self.name,
            'professor': self.professor,
            'description': self.description,
            'collegename' : self.college_name
        }


engine = create_engine('sqlite:///lectures.db')
Base.metadata.create_all(engine)
