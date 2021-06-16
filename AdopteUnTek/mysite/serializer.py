from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import *
from .intra_API_request import is_link_valid


class UserSerializer(serializers.ModelSerializer):
    _gpa = None
    _campus = None
    _promo = None
    _firstname = None

    class Meta:
        model = User
        fields = ('id', '_email', '_firstname', '_gpa', '_campus', '_promo', '_likes', '_match')


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    _link = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        print(validated_data)
        link = validated_data.get('_link')
        if not link:
            print("FAILED TO GET LINK")
            return
        response = is_link_valid(link)
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        instance._email = response["login"]
        instance._gpa = response["gpa"][0]["gpa"]
        instance._name = response["firstname"]
        instance._campus = response["groups"][0]["title"]
        instance._promo = response["promo"]
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance._gpa = validated_data.get('_gpa', instance._gpa)
        instance._campus = validated_data.get('_campus', instance._campus)
        instance._promo = validated_data.get('_promo', instance._promo)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('_link', '_email', "token", "password", "_gpa", "_name", "_campus", "_promo")
